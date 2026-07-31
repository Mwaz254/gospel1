import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
let supabaseClient: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error('Form submissions are temporarily unavailable. Please try again later.');
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return supabaseClient;
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
  const supabase = getSupabaseClient();
  const { error } = await supabase.from('free_sample_leads').insert(data);
  if (error) throw error;
}

export async function insertNewsletterSubscriber(data: {
  name: string;
  email: string;
  country?: string;
  city_region?: string;
}) {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert(
      { ...data, status: 'subscribed', subscribed_at: new Date().toISOString() },
      { onConflict: 'email', ignoreDuplicates: false }
    );
  if (error) throw error;
}

export async function insertPrayerPartner(data: {
  name: string;
  email: string;
  country?: string;
  city_region?: string;
}) {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('prayer_partners')
    .upsert(
      { ...data, status: 'active' },
      { onConflict: 'email', ignoreDuplicates: false }
    );
  if (error) throw error;
}

export async function insertPrayerRequest(data: {
  name: string;
  email?: string;
  request: string;
  country?: string;
  city_region?: string;
}) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from('prayer_requests').insert({
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
  const supabase = getSupabaseClient();
  const { error } = await supabase.from('contact_messages').insert(data);
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
  const supabase = getSupabaseClient();
  const { error } = await supabase.from('donations').insert(data);
  if (error) throw error;
}
