import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://dftjmobjdzphzfgxxtfc.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdGptb2JqZHpwaHpmZ3h4dGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzc1MzQsImV4cCI6MjEwMTY1MzUzNH0.84e3vP6qfxJWzIGUU9kcfXtpzKtC04ZZyMgmwSU37M4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function getSupabaseClient(): SupabaseClient {
  return supabase;
}

/* ─── typed helpers ─────────────────────────────────────────── */

export async function insertFreeSampleLead(data: {
  first_name: string;
  email: string;
  source: 'homepage_cta' | 'free_sample_page';
  country?: string;
  city_region?: string;
  referral_source?: string;
}) {
  const { error } = await getSupabaseClient().from('free_sample_leads').insert(data);
  if (error) throw error;
}

export async function insertNewsletterSubscriber(data: {
  name: string;
  email: string;
  country?: string;
  city_region?: string;
}) {
  const { error } = await getSupabaseClient().from('newsletter_subscribers').insert({
    ...data,
    status: 'subscribed',
    subscribed_at: new Date().toISOString(),
  });
  if (error) {
    if (error.code === '23505') return;
    throw error;
  }
}

export async function insertPrayerPartner(data: {
  name: string;
  email: string;
  country?: string;
  city_region?: string;
}) {
  const { error } = await getSupabaseClient().from('prayer_partners').insert({
    ...data,
    status: 'active',
  });
  if (error) {
    if (error.code === '23505') return;
    throw error;
  }
}

export async function insertPrayerRequest(data: {
  name: string;
  email?: string;
  request: string;
  country?: string;
  city_region?: string;
}) {
  const { error } = await getSupabaseClient().from('prayer_requests').insert({
    name:    data.name,
    email:   data.email || null,
    request: data.request,
    country: data.country || null,
    city_region: data.city_region || null,
  });
  if (error) throw error;
}

export async function insertContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  country?: string;
  city_region?: string;
}) {
  const { error } = await getSupabaseClient().from('contact_messages').insert(data);
  if (error) throw error;
}

export async function insertDonation(data: {
  name: string;
  email: string;
  country?: string;
  city_region?: string;
  amount?: number;
  prayer_request?: string;
  message?: string;
}) {
  const { error } = await getSupabaseClient().from('donations').insert(data);
  if (error) throw error;
}

/* ─── blog helpers ─────────────────────────────────────────── */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  author: string | null;
  category: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await getSupabaseClient()
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await getSupabaseClient()
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw error;
  return data as BlogPost | null;
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await getSupabaseClient()
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  author?: string;
  category?: string;
  status?: string;
  published_at?: string | null;
}): Promise<BlogPost> {
  const { data: row, error } = await getSupabaseClient()
    .from('blog_posts')
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return row as BlogPost;
}

export async function updatePost(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    author: string;
    category: string;
    status: string;
    published_at: string | null;
  }>,
): Promise<BlogPost> {
  const { data: row, error } = await getSupabaseClient()
    .from('blog_posts')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return row as BlogPost;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await getSupabaseClient()
    .from('blog_posts')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
