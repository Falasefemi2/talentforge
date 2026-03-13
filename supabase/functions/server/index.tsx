import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-eaa8882b/health", (c) => {
  return c.json({ status: "ok" });
});

// Jobs endpoints
// Create a new job
app.post("/make-server-eaa8882b/jobs", async (c) => {
  try {
    const job = await c.req.json();
    
    // Store job in kv store
    await kv.set(job.id, job);
    
    console.log(`Job created successfully: ${job.id}`);
    return c.json({ success: true, job });
  } catch (error: any) {
    console.error('Error creating job:', error);
    return c.json({ error: error.message || 'Failed to create job' }, 500);
  }
});

// Get all jobs
app.get("/make-server-eaa8882b/jobs", async (c) => {
  try {
    // Get all jobs by prefix
    const jobs = await kv.getByPrefix('job_');
    
    // Sort by created date, newest first
    jobs.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });
    
    return c.json({ success: true, jobs });
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    return c.json({ error: error.message || 'Failed to fetch jobs' }, 500);
  }
});

// Get a single job by ID
app.get("/make-server-eaa8882b/jobs/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const job = await kv.get(id);
    
    if (!job) {
      return c.json({ error: 'Job not found' }, 404);
    }
    
    return c.json({ success: true, job });
  } catch (error: any) {
    console.error('Error fetching job:', error);
    return c.json({ error: error.message || 'Failed to fetch job' }, 500);
  }
});

// Update a job
app.put("/make-server-eaa8882b/jobs/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const existingJob = await kv.get(id);
    if (!existingJob) {
      return c.json({ error: 'Job not found' }, 404);
    }
    
    const updatedJob = { ...existingJob, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(id, updatedJob);
    
    return c.json({ success: true, job: updatedJob });
  } catch (error: any) {
    console.error('Error updating job:', error);
    return c.json({ error: error.message || 'Failed to update job' }, 500);
  }
});

// Delete a job
app.delete("/make-server-eaa8882b/jobs/:id", async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(id);
    
    return c.json({ success: true, message: 'Job deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting job:', error);
    return c.json({ error: error.message || 'Failed to delete job' }, 500);
  }
});

Deno.serve(app.fetch);