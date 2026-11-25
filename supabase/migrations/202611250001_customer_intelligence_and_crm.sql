-- Migration: 202611250001_customer_intelligence_and_crm.sql
-- Description: Schema for Customer Intelligence, Visitor Tracking, Cookie Consent, CRM & Marketing Automation

-- 1. CUSTOMERS TABLE (Master Customer Directory)
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    company_name TEXT,
    city TEXT DEFAULT 'Moradabad',
    state TEXT DEFAULT 'Uttar Pradesh',
    country TEXT DEFAULT 'India',
    lifecycle_stage TEXT NOT NULL DEFAULT 'lead' CHECK (lifecycle_stage IN ('lead', 'prospect', 'customer', 'repeat_customer', 'lost')),
    total_quotes_requested INT NOT NULL DEFAULT 1,
    total_orders_completed INT NOT NULL DEFAULT 0,
    total_revenue NUMERIC(12,2) NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'INR',
    tags TEXT[] DEFAULT '{}',
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    first_touch_source TEXT,
    last_touch_source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_customers_phone ON public.customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_stage ON public.customers(lifecycle_stage);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON public.customers(created_at DESC);

-- 2. VISITORS TABLE (First-Party Anonymous Visitor Tracking)
CREATE TABLE IF NOT EXISTS public.visitors (
    visitor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fingerprint TEXT,
    first_seen_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    initial_referrer TEXT,
    initial_utm_source TEXT,
    initial_utm_medium TEXT,
    initial_utm_campaign TEXT,
    initial_utm_term TEXT,
    initial_utm_content TEXT,
    device_category TEXT,
    browser TEXT,
    os TEXT,
    country TEXT,
    city TEXT,
    ip_hash TEXT,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_visitors_customer_id ON public.visitors(customer_id);
CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON public.visitors(last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitors_ip_hash ON public.visitors(ip_hash);

-- 3. VISITOR SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.visitor_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL REFERENCES public.visitors(visitor_id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    ended_at TIMESTAMPTZ,
    landing_page TEXT,
    exit_page TEXT,
    page_views_count INT NOT NULL DEFAULT 1,
    events_count INT NOT NULL DEFAULT 0,
    duration_seconds INT NOT NULL DEFAULT 0,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,
    is_bounce BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_sessions_visitor_id ON public.visitor_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON public.visitor_sessions(started_at DESC);

-- 4. VISITOR EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.visitor_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL REFERENCES public.visitors(visitor_id) ON DELETE CASCADE,
    session_id UUID REFERENCES public.visitor_sessions(session_id) ON DELETE SET NULL,
    event_name TEXT NOT NULL,
    page_url TEXT NOT NULL,
    page_title TEXT,
    properties JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_events_visitor_id ON public.visitor_events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_events_session_id ON public.visitor_events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_name ON public.visitor_events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON public.visitor_events(created_at DESC);

-- 5. LEADS TABLE (Inquiries, Quote Requests, WhatsApp Leads)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number TEXT NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    visitor_id UUID REFERENCES public.visitors(visitor_id) ON DELETE SET NULL,
    session_id UUID REFERENCES public.visitor_sessions(session_id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    category_slug TEXT,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'quote_sent', 'negotiation', 'won', 'lost', 'spam')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    source TEXT NOT NULL DEFAULT 'quote_form' CHECK (source IN ('quote_form', 'contact_page', 'whatsapp_click', 'phone_call', 'direct_visit', 'referral', 'other')),
    estimated_value NUMERIC(12,2),
    dimensions TEXT,
    material_preference TEXT,
    message TEXT NOT NULL,
    internal_notes TEXT,
    assigned_to TEXT,
    lost_reason TEXT,
    follow_up_date DATE,
    attribution JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_leads_customer_id ON public.leads(customer_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON public.leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- 6. COOKIE CONSENT RECORDS
CREATE TABLE IF NOT EXISTS public.consent_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL,
    consent_id TEXT NOT NULL,
    essential BOOLEAN NOT NULL DEFAULT TRUE,
    analytics BOOLEAN NOT NULL DEFAULT FALSE,
    advertising BOOLEAN NOT NULL DEFAULT FALSE,
    personalization BOOLEAN NOT NULL DEFAULT FALSE,
    ip_hash TEXT,
    user_agent TEXT,
    action TEXT NOT NULL DEFAULT 'accept_all' CHECK (action IN ('accept_all', 'reject_optional', 'custom_save', 'revoke')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_consent_visitor_id ON public.consent_records(visitor_id);
CREATE INDEX IF NOT EXISTS idx_consent_created_at ON public.consent_records(created_at DESC);

-- 7. MARKETING SUBSCRIPTIONS (Opt-in Registry)
CREATE TABLE IF NOT EXISTS public.marketing_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp', 'sms')),
    destination TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed', 'bounced', 'complained')),
    opt_in_source TEXT NOT NULL DEFAULT 'quote_form',
    opt_in_ip_hash TEXT,
    opt_in_timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    opt_out_timestamp TIMESTAMPTZ,
    opt_out_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_channel_destination UNIQUE (channel, destination)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_customer_id ON public.marketing_subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.marketing_subscriptions(status);

-- 8. MARKETING CAMPAIGNS
CREATE TABLE IF NOT EXISTS public.marketing_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'completed', 'cancelled')),
    subject_or_template_name TEXT NOT NULL,
    content TEXT NOT NULL,
    target_audience JSONB NOT NULL DEFAULT '{}'::jsonb,
    total_recipients INT NOT NULL DEFAULT 0,
    sent_count INT NOT NULL DEFAULT 0,
    delivered_count INT NOT NULL DEFAULT 0,
    opened_count INT NOT NULL DEFAULT 0,
    clicked_count INT NOT NULL DEFAULT 0,
    failed_count INT NOT NULL DEFAULT 0,
    scheduled_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_campaigns_status ON public.marketing_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON public.marketing_campaigns(created_at DESC);

-- 9. MESSAGE LOGS (Outbound & Inbound Audit Trail)
CREATE TABLE IF NOT EXISTS public.message_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES public.marketing_campaigns(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp')),
    provider TEXT NOT NULL CHECK (provider IN ('resend', 'meta_whatsapp')),
    provider_message_id TEXT,
    recipient TEXT NOT NULL,
    direction TEXT NOT NULL DEFAULT 'outbound' CHECK (direction IN ('outbound', 'inbound')),
    message_type TEXT NOT NULL DEFAULT 'transactional' CHECK (message_type IN ('transactional', 'marketing', 'notification')),
    template_name TEXT,
    status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'delivered', 'opened', 'read', 'clicked', 'failed', 'bounced')),
    error_message TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_message_logs_provider_id ON public.message_logs(provider_message_id);
CREATE INDEX IF NOT EXISTS idx_message_logs_lead ON public.message_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_message_logs_customer ON public.message_logs(customer_id);
CREATE INDEX IF NOT EXISTS idx_message_logs_created_at ON public.message_logs(created_at DESC);

-- 10. AUDIT LOGS (Admin & Security Events)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    old_values JSONB,
    new_values JSONB,
    ip_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- 11. AUTOMATIC UPDATED_AT TRIGGERS
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_updated_at') THEN
        CREATE FUNCTION public.handle_updated_at()
        RETURNS TRIGGER AS $func$
        BEGIN
            NEW.updated_at = timezone('utc', now());
            RETURN NEW;
        END;
        $func$ LANGUAGE plpgsql;
    END IF;
END $$;

DROP TRIGGER IF EXISTS trg_customers_updated_at ON public.customers;
CREATE TRIGGER trg_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_visitors_updated_at ON public.visitors;
CREATE TRIGGER trg_visitors_updated_at BEFORE UPDATE ON public.visitors FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_leads_updated_at ON public.leads;
CREATE TRIGGER trg_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_marketing_subscriptions_updated_at ON public.marketing_subscriptions;
CREATE TRIGGER trg_marketing_subscriptions_updated_at BEFORE UPDATE ON public.marketing_subscriptions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_marketing_campaigns_updated_at ON public.marketing_campaigns;
CREATE TRIGGER trg_marketing_campaigns_updated_at BEFORE UPDATE ON public.marketing_campaigns FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_message_logs_updated_at ON public.message_logs;
CREATE TRIGGER trg_message_logs_updated_at BEFORE UPDATE ON public.message_logs FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 12. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ADMIN POLICIES (Full CRUD access for verified catalog admins)
CREATE POLICY "Admins full access on customers" ON public.customers FOR ALL TO authenticated USING (public.is_catalog_admin()) WITH CHECK (public.is_catalog_admin());
CREATE POLICY "Admins full access on visitors" ON public.visitors FOR ALL TO authenticated USING (public.is_catalog_admin()) WITH CHECK (public.is_catalog_admin());
CREATE POLICY "Admins full access on visitor_sessions" ON public.visitor_sessions FOR ALL TO authenticated USING (public.is_catalog_admin()) WITH CHECK (public.is_catalog_admin());
CREATE POLICY "Admins full access on visitor_events" ON public.visitor_events FOR ALL TO authenticated USING (public.is_catalog_admin()) WITH CHECK (public.is_catalog_admin());
CREATE POLICY "Admins full access on leads" ON public.leads FOR ALL TO authenticated USING (public.is_catalog_admin()) WITH CHECK (public.is_catalog_admin());
CREATE POLICY "Admins full access on consent_records" ON public.consent_records FOR ALL TO authenticated USING (public.is_catalog_admin()) WITH CHECK (public.is_catalog_admin());
CREATE POLICY "Admins full access on marketing_subscriptions" ON public.marketing_subscriptions FOR ALL TO authenticated USING (public.is_catalog_admin()) WITH CHECK (public.is_catalog_admin());
CREATE POLICY "Admins full access on marketing_campaigns" ON public.marketing_campaigns FOR ALL TO authenticated USING (public.is_catalog_admin()) WITH CHECK (public.is_catalog_admin());
CREATE POLICY "Admins full access on message_logs" ON public.message_logs FOR ALL TO authenticated USING (public.is_catalog_admin()) WITH CHECK (public.is_catalog_admin());
CREATE POLICY "Admins full access on audit_logs" ON public.audit_logs FOR ALL TO authenticated USING (public.is_catalog_admin()) WITH CHECK (public.is_catalog_admin());

-- PUBLIC / ANON POLICIES
-- Consent logging: anon can insert their own consent records
CREATE POLICY "Public insert consent records" ON public.consent_records FOR INSERT TO anon, authenticated WITH CHECK (true);

-- GRANTS TO SERVICE_ROLE, AUTHENTICATED, AND ANON
GRANT ALL ON TABLE public.customers TO service_role;
GRANT ALL ON TABLE public.visitors TO service_role;
GRANT ALL ON TABLE public.visitor_sessions TO service_role;
GRANT ALL ON TABLE public.visitor_events TO service_role;
GRANT ALL ON TABLE public.leads TO service_role;
GRANT ALL ON TABLE public.consent_records TO service_role;
GRANT ALL ON TABLE public.marketing_subscriptions TO service_role;
GRANT ALL ON TABLE public.marketing_campaigns TO service_role;
GRANT ALL ON TABLE public.message_logs TO service_role;
GRANT ALL ON TABLE public.audit_logs TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.customers TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.visitors TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.visitor_sessions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.visitor_events TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.leads TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.consent_records TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.marketing_subscriptions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.marketing_campaigns TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.message_logs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.audit_logs TO authenticated;

GRANT INSERT ON TABLE public.consent_records TO anon;
