export type App = {
  name: string
  description: string
  url: string
  logoUrl?: string
  tags: string[]
  actions: number
}

export type AppCategory = {
  slug: string
  label: string
  desc: string
  count: number
  apps: App[]
}

export const APP_CATEGORIES: AppCategory[] = [
  {
    slug: "developer-tools-devops",
    label: "Developer Tools & DevOps",
    desc: "Query repos, monitor errors, manage CI/CD pipelines, and run database lookups — all from inside the conversation.",
    count: 48,
    apps: [
      { name: "GitHub", description: "Create issues, open pull requests, comment on code, and query repositories directly from customer conversations.", url: "https://github.com", logoUrl: "https://github.githubassets.com/favicons/favicon.png", tags: ["Repos", "PRs", "Issues"], actions: 46 },
      { name: "GitLab", description: "Manage merge requests, query pipelines, create issues, and browse project activity in GitLab.", url: "https://gitlab.com", logoUrl: "https://gitlab.com/favicon.ico", tags: ["CI/CD", "Repos", "Issues"], actions: 38 },
      { name: "Bitbucket", description: "Browse repos, review commits, manage Bitbucket pull requests and pipelines from one place.", url: "https://bitbucket.org", logoUrl: "https://bitbucket.org/favicon.ico", tags: ["Repos", "PRs", "Atlassian"], actions: 29 },
      { name: "Sentry", description: "Look up recent errors, check event volume, and link issues to support tickets automatically.", url: "https://sentry.io", logoUrl: "https://sentry.io/favicon.ico", tags: ["Monitoring", "Errors", "Alerts"], actions: 22 },
      { name: "Linear", description: "Create and update Linear issues, check project status, and move tickets through the workflow.", url: "https://linear.app", logoUrl: "https://linear.app/favicon.ico", tags: ["Issues", "Roadmap", "Teams"], actions: 31 },
      { name: "PagerDuty", description: "Acknowledge incidents, update status, and escalate on-call alerts without leaving the inbox.", url: "https://pagerduty.com", logoUrl: "https://pagerduty.com/favicon.ico", tags: ["Incidents", "On-call", "Alerts"], actions: 18 },
      { name: "Datadog", description: "Query live metrics, check dashboards, and surface recent monitor alerts for engineering context.", url: "https://datadoghq.com", logoUrl: "https://datadoghq.com/favicon.ico", tags: ["Metrics", "APM", "Logs"], actions: 24 },
      { name: "Supabase", description: "Run queries, look up records, and update rows in your Supabase Postgres database.", url: "https://supabase.com", logoUrl: "https://supabase.com/favicon.ico", tags: ["Database", "Postgres", "Realtime"], actions: 19 },
    ],
  },
  {
    slug: "crm",
    label: "CRM",
    desc: "Look up and update contacts, deals, and accounts as the chat happens — no tab-switching required.",
    count: 22,
    apps: [
      { name: "HubSpot", description: "Search contacts, read deal stages, update properties, log calls, and create new CRM records on the fly.", url: "https://hubspot.com", logoUrl: "https://hubspot.com/favicon.ico", tags: ["Contacts", "Deals", "Marketing"], actions: 54 },
      { name: "Salesforce", description: "Query Salesforce objects, update opportunity stages, and log activity notes without leaving the conversation.", url: "https://salesforce.com", logoUrl: "https://salesforce.com/favicon.ico", tags: ["Enterprise", "Opportunities", "Leads"], actions: 61 },
      { name: "Pipedrive", description: "Look up pipeline deals, move them to the next stage, and attach notes or files from the chat.", url: "https://pipedrive.com", logoUrl: "https://pipedrive.com/favicon.ico", tags: ["Deals", "Pipeline", "Sales"], actions: 33 },
      { name: "Zoho CRM", description: "Access leads, contacts, and accounts across Zoho CRM and sync activity back automatically.", url: "https://zoho.com/crm", logoUrl: "https://zoho.com/favicon.ico", tags: ["Leads", "Contacts", "Zoho"], actions: 28 },
      { name: "Close", description: "Manage leads, log calls, send emails, and update deal status inside Close CRM.", url: "https://close.com", logoUrl: "https://close.com/favicon.ico", tags: ["Sales", "Calls", "Email"], actions: 26 },
      { name: "Attio", description: "Query the relationship graph, update person or company records, and sync data from any source.", url: "https://attio.com", logoUrl: "https://attio.com/favicon.ico", tags: ["Modern CRM", "Relationships", "Data"], actions: 21 },
      { name: "ActiveCampaign", description: "Look up contact activity, update tags, and trigger automation sequences from inside the conversation.", url: "https://activecampaign.com", logoUrl: "https://activecampaign.com/favicon.ico", tags: ["Email", "Automations", "CRM"], actions: 24 },
      { name: "Monday CRM", description: "Track deals on Monday.com boards, update statuses, and create new items during customer interactions.", url: "https://monday.com", logoUrl: "https://monday.com/favicon.ico", tags: ["Boards", "Deals", "Visual"], actions: 19 },
    ],
  },
  {
    slug: "finance-accounting",
    label: "Finance & Accounting",
    desc: "Pull invoices, update orders, and issue payments and refunds — all connected to your live financial data.",
    count: 31,
    apps: [
      { name: "Razorpay", description: "Fetch payment links, update order amounts, check transaction status, and process refunds instantly.", url: "https://razorpay.com", logoUrl: "https://razorpay.com/favicon.ico", tags: ["Payments", "India", "Refunds"], actions: 42 },
      { name: "Stripe", description: "Look up customers, retrieve invoice details, update subscriptions, and trigger refunds on demand.", url: "https://stripe.com", logoUrl: "https://stripe.com/favicon.ico", tags: ["Payments", "Subscriptions", "Global"], actions: 58 },
      { name: "QuickBooks", description: "Fetch invoices, check account balances, create new bills, and reconcile transactions via chat.", url: "https://quickbooks.intuit.com", logoUrl: "https://quickbooks.intuit.com/favicon.ico", tags: ["Invoices", "Accounting", "SMB"], actions: 36 },
      { name: "Xero", description: "Query Xero invoices, contacts, and bank feeds — and create new transactions right from the conversation.", url: "https://xero.com", logoUrl: "https://xero.com/favicon.ico", tags: ["Invoices", "Accounting", "Global"], actions: 31 },
      { name: "FreshBooks", description: "Pull client invoices, check overdue amounts, and send payment reminders without opening FreshBooks.", url: "https://freshbooks.com", logoUrl: "https://freshbooks.com/favicon.ico", tags: ["Invoices", "Freelancers", "Billing"], actions: 22 },
      { name: "PayPal", description: "Check transaction status, issue refunds, and query PayPal order details in-conversation.", url: "https://paypal.com", logoUrl: "https://paypal.com/favicon.ico", tags: ["Payments", "Refunds", "Global"], actions: 19 },
      { name: "Brex", description: "Look up spend, check card limits, and surface recent expenses tied to a customer interaction.", url: "https://brex.com", logoUrl: "https://brex.com/favicon.ico", tags: ["Corporate cards", "Spend", "Finance"], actions: 14 },
      { name: "Mercury", description: "Query account balances and recent transactions — useful for finance teams answering internal queries.", url: "https://mercury.com", logoUrl: "https://mercury.com/favicon.ico", tags: ["Banking", "Startups", "Accounts"], actions: 11 },
    ],
  },
  {
    slug: "ecommerce",
    label: "E-commerce",
    desc: "Fetch order status, track shipments, and process returns — connected to your store's live data.",
    count: 18,
    apps: [
      { name: "Shopify", description: "Look up orders, check inventory, update fulfillment status, and process refunds from any conversation.", url: "https://shopify.com", logoUrl: "https://shopify.com/favicon.ico", tags: ["Orders", "Inventory", "Refunds"], actions: 47 },
      { name: "WooCommerce", description: "Fetch WooCommerce order details, update order status, and create new orders programmatically.", url: "https://woocommerce.com", logoUrl: "https://woocommerce.com/favicon.ico", tags: ["WordPress", "Orders", "Products"], actions: 29 },
      { name: "BigCommerce", description: "Access BigCommerce orders, product catalogs, and customer profiles in real time.", url: "https://bigcommerce.com", logoUrl: "https://bigcommerce.com/favicon.ico", tags: ["Enterprise", "Orders", "Catalog"], actions: 24 },
      { name: "Amazon Seller", description: "Query Amazon Seller Central orders, handle returns, and check FBA inventory levels.", url: "https://sellercentral.amazon.com", logoUrl: "https://amazon.com/favicon.ico", tags: ["Marketplace", "FBA", "Orders"], actions: 18 },
      { name: "Squarespace", description: "Look up Squarespace commerce orders, send fulfillment updates, and manage product listings.", url: "https://squarespace.com", logoUrl: "https://squarespace.com/favicon.ico", tags: ["Commerce", "Products", "Orders"], actions: 14 },
      { name: "Wix Stores", description: "Access Wix store orders, update inventory, and query product details from the conversation.", url: "https://wix.com", logoUrl: "https://wix.com/favicon.ico", tags: ["Stores", "Products", "Orders"], actions: 13 },
      { name: "Etsy", description: "Retrieve Etsy shop orders, check listing details, and respond to buyer questions with real data.", url: "https://etsy.com", logoUrl: "https://etsy.com/favicon.ico", tags: ["Marketplace", "Handmade", "Orders"], actions: 12 },
      { name: "AfterShip", description: "Fetch live shipment tracking status and carrier details for any order number.", url: "https://aftership.com", logoUrl: "https://aftership.com/favicon.ico", tags: ["Tracking", "Shipping", "Couriers"], actions: 9 },
    ],
  },
  {
    slug: "sales-customer-support",
    label: "Sales & Customer Support",
    desc: "Read and update tickets, check SLAs, and resolve support requests across your existing help desks.",
    count: 19,
    apps: [
      { name: "Zendesk", description: "Read tickets, update status, add internal notes, apply macros, and escalate — all from within the AI conversation.", url: "https://zendesk.com", logoUrl: "https://zendesk.com/favicon.ico", tags: ["Tickets", "Enterprise", "Help desk"], actions: 43 },
      { name: "Intercom", description: "Fetch conversation history, update contacts, send replies, and assign conversations to agents.", url: "https://intercom.com", logoUrl: "https://intercom.com/favicon.ico", tags: ["Conversations", "Live chat", "CRM"], actions: 36 },
      { name: "Freshdesk", description: "Look up tickets, update priority and status, add notes, and route to the right group automatically.", url: "https://freshdesk.com", logoUrl: "https://freshdesk.com/favicon.ico", tags: ["Tickets", "SMB", "Omnichannel"], actions: 31 },
      { name: "Gorgias", description: "Pull order-related Gorgias tickets, apply tags, and resolve e-commerce support requests end-to-end.", url: "https://gorgias.com", logoUrl: "https://gorgias.com/favicon.ico", tags: ["E-commerce", "Tickets", "Shopify"], actions: 24 },
      { name: "Help Scout", description: "Find conversations, update customer data, add notes, and send replies in Help Scout.", url: "https://helpscout.com", logoUrl: "https://helpscout.com/favicon.ico", tags: ["Conversations", "SMB", "Email"], actions: 22 },
      { name: "Front", description: "Access shared inboxes, assign messages, create drafts, and manage conversation workflows.", url: "https://frontapp.com", logoUrl: "https://frontapp.com/favicon.ico", tags: ["Shared inbox", "Teams", "Email"], actions: 18 },
      { name: "Dixa", description: "Read Dixa conversations, update conversation metadata, and post replies across all channels.", url: "https://dixa.com", logoUrl: "https://dixa.com/favicon.ico", tags: ["Omnichannel", "Conversations", "Routing"], actions: 14 },
      { name: "Kustomer", description: "Fetch customer timelines, create conversations, and update attributes inside Kustomer.", url: "https://kustomer.com", logoUrl: "https://kustomer.com/favicon.ico", tags: ["CRM", "Conversations", "Enterprise"], actions: 17 },
    ],
  },
  {
    slug: "hr-recruiting",
    label: "HR & Recruiting",
    desc: "Look up employees, leave balances, candidate pipelines, and HR records from inside the conversation.",
    count: 14,
    apps: [
      { name: "BambooHR", description: "Fetch employee profiles, check leave balances, and look up org-chart data without opening BambooHR.", url: "https://bamboohr.com", logoUrl: "https://bamboohr.com/favicon.ico", tags: ["HRIS", "Employees", "Leave"], actions: 28 },
      { name: "Greenhouse", description: "Access candidate pipeline, check interview stages, and update candidate status from the conversation.", url: "https://greenhouse.io", logoUrl: "https://greenhouse.io/favicon.ico", tags: ["ATS", "Recruiting", "Candidates"], actions: 24 },
      { name: "Lever", description: "Query job postings, look up candidates, and move applicants through the hiring funnel.", url: "https://lever.co", logoUrl: "https://lever.co/favicon.ico", tags: ["ATS", "Hiring", "Candidates"], actions: 21 },
      { name: "Gusto", description: "Look up employee payroll data, benefits information, and time-off balances via Gusto.", url: "https://gusto.com", logoUrl: "https://gusto.com/favicon.ico", tags: ["Payroll", "Benefits", "HR"], actions: 18 },
      { name: "Rippling", description: "Query Rippling employee data, check app provisioning status, and access HR workflows.", url: "https://rippling.com", logoUrl: "https://rippling.com/favicon.ico", tags: ["HRIS", "IT", "Payroll"], actions: 16 },
      { name: "Workable", description: "Browse job pipeline, add candidates, and check interview feedback inside Workable.", url: "https://workable.com", logoUrl: "https://workable.com/favicon.ico", tags: ["ATS", "Recruiting", "SMB"], actions: 14 },
      { name: "HiBob", description: "Fetch employee records, org structures, and time-off requests from HiBob.", url: "https://hibob.com", logoUrl: "https://hibob.com/favicon.ico", tags: ["HRIS", "Employees", "Modern"], actions: 12 },
      { name: "Deel", description: "Access contractor and employee records, check invoices, and manage global payroll in Deel.", url: "https://deel.com", logoUrl: "https://deel.com/favicon.ico", tags: ["Global payroll", "Contractors", "Remote"], actions: 11 },
    ],
  },
  {
    slug: "document-file-management",
    label: "Document & File Management",
    desc: "Search, read, and attach files from your storage and docs — surfaced directly in the conversation.",
    count: 21,
    apps: [
      { name: "Google Drive", description: "Search Drive files, read documents, share with teammates, and create new Docs, Sheets, or Slides.", url: "https://drive.google.com", logoUrl: "https://drive.google.com/favicon.ico", tags: ["Files", "Google", "Collaboration"], actions: 34 },
      { name: "Notion", description: "Search Notion pages, read database entries, create new pages, and update properties on the fly.", url: "https://notion.so", logoUrl: "https://notion.so/favicon.ico", tags: ["Docs", "Databases", "Wiki"], actions: 31 },
      { name: "Dropbox", description: "Find and retrieve files from Dropbox, share links, and upload new documents during a conversation.", url: "https://dropbox.com", logoUrl: "https://dropbox.com/favicon.ico", tags: ["Files", "Sharing", "Storage"], actions: 22 },
      { name: "OneDrive", description: "Browse OneDrive files, open SharePoint documents, and share links from Microsoft 365.", url: "https://onedrive.live.com", logoUrl: "https://onedrive.live.com/favicon.ico", tags: ["Files", "Microsoft", "SharePoint"], actions: 19 },
      { name: "Box", description: "Retrieve Box files, manage folder permissions, and preview documents without leaving the inbox.", url: "https://box.com", logoUrl: "https://box.com/favicon.ico", tags: ["Enterprise", "Files", "Security"], actions: 17 },
      { name: "Confluence", description: "Search Confluence pages, read technical docs, and create or update pages inline.", url: "https://atlassian.com/software/confluence", logoUrl: "https://atlassian.com/favicon.ico", tags: ["Wiki", "Docs", "Atlassian"], actions: 24 },
      { name: "DocuSign", description: "Check envelope status, send signature requests, and retrieve signed documents from DocuSign.", url: "https://docusign.com", logoUrl: "https://docusign.com/favicon.ico", tags: ["eSign", "Contracts", "Envelopes"], actions: 14 },
      { name: "SharePoint", description: "Access SharePoint document libraries, lists, and site content across Microsoft 365.", url: "https://sharepoint.com", logoUrl: "https://sharepoint.com/favicon.ico", tags: ["Intranet", "Docs", "Microsoft"], actions: 16 },
    ],
  },
  {
    slug: "collaboration-communication",
    label: "Collaboration & Communication",
    desc: "Read threads, post updates, and notify the right channel — across email, chat, and messaging apps.",
    count: 26,
    apps: [
      { name: "Gmail", description: "Read email threads, draft and send replies, search inbox, and label conversations via Gmail API.", url: "https://gmail.com", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/120px-Gmail_icon_%282020%29.svg.png", tags: ["Email", "Google", "Inbox"], actions: 29 },
      { name: "Slack", description: "Post messages to channels, fetch conversation history, create threads, and notify teams on escalation.", url: "https://slack.com", logoUrl: "https://slack.com/favicon.ico", tags: ["Chat", "Channels", "Teams"], actions: 38 },
      { name: "Microsoft Teams", description: "Send channel messages, read chat history, and create Teams meetings from inside the conversation.", url: "https://teams.microsoft.com", logoUrl: "https://teams.microsoft.com/favicon.ico", tags: ["Chat", "Microsoft", "Video"], actions: 27 },
      { name: "Discord", description: "Post messages to Discord servers, read channel history, and manage server content programmatically.", url: "https://discord.com", logoUrl: "https://discord.com/favicon.ico", tags: ["Communities", "Chat", "Voice"], actions: 18 },
      { name: "Outlook", description: "Read and send Outlook emails, manage calendar events, and access contact directories.", url: "https://outlook.com", logoUrl: "https://outlook.com/favicon.ico", tags: ["Email", "Microsoft", "Calendar"], actions: 22 },
      { name: "Telegram", description: "Send Telegram messages, retrieve group history, and trigger bots — for teams using Telegram for ops.", url: "https://telegram.org", logoUrl: "https://telegram.org/favicon.ico", tags: ["Messaging", "Bots", "Groups"], actions: 12 },
      { name: "WhatsApp Business", description: "Send template messages, manage contacts, and retrieve conversation metadata via the WhatsApp Business API.", url: "https://business.whatsapp.com", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/120px-WhatsApp.svg.png", tags: ["Messaging", "Business", "Templates"], actions: 11 },
      { name: "Zoom", description: "Schedule Zoom meetings, fetch meeting recordings, and access participant data.", url: "https://zoom.us", logoUrl: "https://zoom.us/favicon.ico", tags: ["Video", "Meetings", "Recordings"], actions: 16 },
    ],
  },
  {
    slug: "productivity-project-management",
    label: "Productivity & Project Management",
    desc: "Create tasks, move tickets, and check project status across all your team's productivity apps.",
    count: 24,
    apps: [
      { name: "Jira", description: "Create Jira issues, update sprint status, transition tickets, and fetch project metrics on demand.", url: "https://atlassian.com/software/jira", logoUrl: "https://atlassian.com/favicon.ico", tags: ["Issues", "Sprints", "Atlassian"], actions: 44 },
      { name: "Asana", description: "Create tasks, update project boards, add subtasks, and track progress across Asana workspaces.", url: "https://asana.com", logoUrl: "https://asana.com/favicon.ico", tags: ["Tasks", "Projects", "Teams"], actions: 36 },
      { name: "Linear", description: "Open issues, update cycle status, move to the next stage, and link related issues inside Linear.", url: "https://linear.app", logoUrl: "https://linear.app/favicon.ico", tags: ["Issues", "Roadmap", "Engineering"], actions: 31 },
      { name: "Trello", description: "Add Trello cards, move between lists, update labels, and query board activity in real time.", url: "https://trello.com", logoUrl: "https://trello.com/favicon.ico", tags: ["Kanban", "Cards", "Visual"], actions: 24 },
      { name: "ClickUp", description: "Create ClickUp tasks, set priorities, update custom fields, and move tasks across spaces.", url: "https://clickup.com", logoUrl: "https://clickup.com/favicon.ico", tags: ["Tasks", "All-in-one", "Custom fields"], actions: 41 },
      { name: "Monday.com", description: "Create Monday items, update column values, and retrieve board data for project reporting.", url: "https://monday.com", logoUrl: "https://monday.com/favicon.ico", tags: ["Boards", "Visual", "Automation"], actions: 29 },
      { name: "Notion", description: "Create Notion database entries, update properties, and link pages to track project context.", url: "https://notion.so", logoUrl: "https://notion.so/favicon.ico", tags: ["Docs", "Databases", "Wiki"], actions: 31 },
      { name: "Basecamp", description: "Post to Basecamp message boards, create to-dos, and check project schedules.", url: "https://basecamp.com", logoUrl: "https://basecamp.com/favicon.ico", tags: ["Projects", "Teams", "Simple"], actions: 16 },
    ],
  },
  {
    slug: "scheduling-booking",
    label: "Scheduling & Booking",
    desc: "Check availability, book, and reschedule appointments — tied to your calendar and booking systems.",
    count: 11,
    apps: [
      { name: "Google Calendar", description: "Check availability, create events, send invites, and reschedule meetings from inside any conversation.", url: "https://calendar.google.com", logoUrl: "https://calendar.google.com/favicon.ico", tags: ["Calendar", "Events", "Google"], actions: 22 },
      { name: "Calendly", description: "Look up a person's availability, create scheduling links, and cancel or reschedule bookings.", url: "https://calendly.com", logoUrl: "https://calendly.com/favicon.ico", tags: ["Scheduling", "Booking", "Links"], actions: 14 },
      { name: "Cal.com", description: "Fetch open time slots, create bookings, and manage event types via the Cal.com open API.", url: "https://cal.com", logoUrl: "https://cal.com/favicon.ico", tags: ["Open source", "Scheduling", "Self-host"], actions: 18 },
      { name: "Acuity Scheduling", description: "Book, cancel, and reschedule Acuity appointments and check client availability.", url: "https://acuityscheduling.com", logoUrl: "https://acuityscheduling.com/favicon.ico", tags: ["Booking", "Appointments", "Services"], actions: 12 },
      { name: "Outlook Calendar", description: "Create and update Outlook calendar events, check free/busy, and send meeting invites.", url: "https://outlook.com/calendar", logoUrl: "https://outlook.com/favicon.ico", tags: ["Calendar", "Microsoft", "Events"], actions: 19 },
      { name: "Zoom", description: "Schedule Zoom meetings, generate join links, and send calendar invites automatically.", url: "https://zoom.us", logoUrl: "https://zoom.us/favicon.ico", tags: ["Video", "Meetings", "Scheduling"], actions: 16 },
      { name: "HubSpot Meetings", description: "Book meetings using HubSpot Meetings links and sync them directly to your CRM contacts.", url: "https://hubspot.com", logoUrl: "https://hubspot.com/favicon.ico", tags: ["CRM", "Booking", "HubSpot"], actions: 11 },
      { name: "Mindbody", description: "Book fitness classes, check schedules, and manage client appointments in Mindbody.", url: "https://mindbodyonline.com", logoUrl: "https://mindbodyonline.com/favicon.ico", tags: ["Fitness", "Wellness", "Booking"], actions: 8 },
    ],
  },
  {
    slug: "analytics-data",
    label: "Analytics & Data",
    desc: "Surface live metrics and reports without leaving the inbox — real numbers, not guesses.",
    count: 16,
    apps: [
      { name: "Google Analytics", description: "Pull real-time visitor counts, top pages, conversion rates, and traffic sources on demand.", url: "https://analytics.google.com", logoUrl: "https://analytics.google.com/favicon.ico", tags: ["Web analytics", "Traffic", "Google"], actions: 18 },
      { name: "Mixpanel", description: "Query Mixpanel events, funnels, and retention cohorts to answer product questions in conversation.", url: "https://mixpanel.com", logoUrl: "https://mixpanel.com/favicon.ico", tags: ["Product analytics", "Events", "Funnels"], actions: 16 },
      { name: "Amplitude", description: "Retrieve Amplitude charts, check user journeys, and surface key product metrics instantly.", url: "https://amplitude.com", logoUrl: "https://amplitude.com/favicon.ico", tags: ["Product analytics", "Cohorts", "Retention"], actions: 14 },
      { name: "Segment", description: "Look up Segment user traits, review event streams, and query audiences for personalization.", url: "https://segment.com", logoUrl: "https://segment.com/favicon.ico", tags: ["CDP", "Events", "Integrations"], actions: 12 },
      { name: "PostHog", description: "Query PostHog events, feature flags, and session recordings to debug or analyze user behavior.", url: "https://posthog.com", logoUrl: "https://posthog.com/favicon.ico", tags: ["Open source", "Events", "Feature flags"], actions: 19 },
      { name: "Heap", description: "Access Heap behavioral data and retroactive analytics to understand customer journeys.", url: "https://heap.io", logoUrl: "https://heap.io/favicon.ico", tags: ["Autocapture", "Behavioral", "Analytics"], actions: 11 },
      { name: "Hotjar", description: "Check heatmaps, retrieve session recording metadata, and query user feedback from Hotjar.", url: "https://hotjar.com", logoUrl: "https://hotjar.com/favicon.ico", tags: ["Heatmaps", "Recordings", "Feedback"], actions: 9 },
      { name: "Looker", description: "Run Looker Looks and dashboards on demand and surface BI insights directly in the conversation.", url: "https://looker.com", logoUrl: "https://looker.com/favicon.ico", tags: ["BI", "Dashboards", "Enterprise"], actions: 13 },
    ],
  },
  {
    slug: "data-analytics",
    label: "Data & Analytics",
    desc: "Run lookups and aggregations against your data warehouse or database — no SQL client required.",
    count: 15,
    apps: [
      { name: "Supabase", description: "Run Postgres queries, update rows, and fetch records from Supabase tables in real time.", url: "https://supabase.com", logoUrl: "https://supabase.com/favicon.ico", tags: ["Postgres", "Realtime", "Open source"], actions: 19 },
      { name: "Neon", description: "Query Neon serverless Postgres databases and retrieve live data for any customer request.", url: "https://neon.tech", logoUrl: "https://neon.tech/favicon.ico", tags: ["Serverless", "Postgres", "Branching"], actions: 14 },
      { name: "BigQuery", description: "Run SQL queries against Google BigQuery datasets and return results directly in the conversation.", url: "https://cloud.google.com/bigquery", logoUrl: "https://cloud.google.com/favicon.ico", tags: ["Data warehouse", "SQL", "Google"], actions: 12 },
      { name: "Snowflake", description: "Execute Snowflake queries, fetch aggregations, and retrieve warehouse analytics on demand.", url: "https://snowflake.com", logoUrl: "https://snowflake.com/favicon.ico", tags: ["Data warehouse", "SQL", "Cloud"], actions: 11 },
      { name: "Airtable", description: "Retrieve Airtable records, filter views, and create or update rows as part of any workflow.", url: "https://airtable.com", logoUrl: "https://airtable.com/favicon.ico", tags: ["No-code DB", "Tables", "Views"], actions: 24 },
      { name: "MongoDB", description: "Query MongoDB collections, fetch documents, and update records from inside the conversation.", url: "https://mongodb.com", logoUrl: "https://mongodb.com/favicon.ico", tags: ["NoSQL", "Documents", "Atlas"], actions: 16 },
      { name: "PlanetScale", description: "Run MySQL-compatible queries against PlanetScale branches for live data lookups.", url: "https://planetscale.com", logoUrl: "https://planetscale.com/favicon.ico", tags: ["MySQL", "Serverless", "Branches"], actions: 9 },
      { name: "Redis", description: "Get and set Redis keys, run cache lookups, and query sorted sets or hashes in real time.", url: "https://redis.io", logoUrl: "https://redis.io/favicon.ico", tags: ["Cache", "In-memory", "Fast"], actions: 13 },
    ],
  },
  {
    slug: "ai-machine-learning",
    label: "AI & Machine Learning",
    desc: "Enrich, search, and scrape the open web — and call LLMs or ML models on demand.",
    count: 17,
    apps: [
      { name: "OpenAI", description: "Call GPT-4o and other OpenAI models for text, images, and structured outputs inside any workflow.", url: "https://openai.com", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/120px-ChatGPT_logo.svg.png", tags: ["LLM", "GPT-4o", "API"], actions: 14 },
      { name: "Tavily", description: "Real-time AI-optimized web search — retrieve cited search results for any question in seconds.", url: "https://tavily.com", logoUrl: "https://tavily.com/favicon.ico", tags: ["Search", "Real-time", "Citations"], actions: 8 },
      { name: "Firecrawl", description: "Scrape any webpage or crawl a full site and return clean Markdown for AI consumption.", url: "https://firecrawl.dev", logoUrl: "https://firecrawl.dev/favicon.ico", tags: ["Scraping", "Crawling", "Markdown"], actions: 11 },
      { name: "Pinecone", description: "Run vector similarity searches, upsert embeddings, and query namespaced Pinecone indices.", url: "https://pinecone.io", logoUrl: "https://pinecone.io/favicon.ico", tags: ["Vector DB", "Embeddings", "Semantic search"], actions: 16 },
      { name: "Browserbase", description: "Spin up headless browsers, run automations, and scrape dynamic web content at scale.", url: "https://browserbase.com", logoUrl: "https://browserbase.com/favicon.ico", tags: ["Headless", "Scraping", "Automation"], actions: 10 },
      { name: "ElevenLabs", description: "Generate realistic text-to-speech audio and clone voices for AI-driven voice experiences.", url: "https://elevenlabs.io", logoUrl: "https://elevenlabs.io/favicon.ico", tags: ["TTS", "Voice cloning", "Audio"], actions: 12 },
      { name: "Stability AI", description: "Generate and edit images on demand using Stable Diffusion and Stability AI's model APIs.", url: "https://stability.ai", logoUrl: "https://stability.ai/favicon.ico", tags: ["Image gen", "Diffusion", "Art"], actions: 9 },
      { name: "LangSmith", description: "Log LLM traces, inspect runs, and monitor AI agent behavior via the LangSmith observability platform.", url: "https://smith.langchain.com", logoUrl: "https://smith.langchain.com/favicon.ico", tags: ["Observability", "Tracing", "LangChain"], actions: 8 },
    ],
  },
  {
    slug: "workflow-automation",
    label: "Workflow Automation",
    desc: "Trigger multi-app automations as part of a conversation — resolve requests by chaining the right actions.",
    count: 12,
    apps: [
      { name: "Zapier", description: "Trigger Zapier Zaps from within a conversation to kick off multi-step automations across thousands of apps.", url: "https://zapier.com", logoUrl: "https://zapier.com/favicon.ico", tags: ["No-code", "5000+ apps", "Triggers"], actions: 16 },
      { name: "Make", description: "Trigger Make (Integromat) scenarios on demand to run complex multi-branch automation flows.", url: "https://make.com", logoUrl: "https://make.com/favicon.ico", tags: ["Visual", "Scenarios", "Advanced"], actions: 14 },
      { name: "n8n", description: "Trigger self-hosted n8n workflows from inside the conversation — full code-level control.", url: "https://n8n.io", logoUrl: "https://n8n.io/favicon.ico", tags: ["Open source", "Self-host", "Code"], actions: 11 },
      { name: "Pipedream", description: "Execute Pipedream workflows in real time and receive structured responses back in the chat.", url: "https://pipedream.com", logoUrl: "https://pipedream.com/favicon.ico", tags: ["Serverless", "Developer", "APIs"], actions: 13 },
      { name: "Tray.io", description: "Call Tray automation connectors to orchestrate enterprise-grade multi-app workflows.", url: "https://tray.io", logoUrl: "https://tray.io/favicon.ico", tags: ["Enterprise", "iPaaS", "Connectors"], actions: 9 },
      { name: "Workato", description: "Trigger Workato recipes to connect complex enterprise workflows from within a conversation.", url: "https://workato.com", logoUrl: "https://workato.com/favicon.ico", tags: ["Enterprise", "iPaaS", "Recipes"], actions: 12 },
      { name: "Activepieces", description: "Open-source Zapier alternative — trigger flows and run automations with full self-host control.", url: "https://activepieces.com", logoUrl: "https://activepieces.com/favicon.ico", tags: ["Open source", "No-code", "Self-host"], actions: 8 },
      { name: "Temporal", description: "Trigger Temporal workflows for long-running, fault-tolerant business process automation.", url: "https://temporal.io", logoUrl: "https://temporal.io/favicon.ico", tags: ["Durable", "Workflows", "Developer"], actions: 7 },
    ],
  },
  {
    slug: "marketing-social-media",
    label: "Marketing & Social Media",
    desc: "Manage campaigns, send emails, and respond across social channels — from a single conversation.",
    count: 20,
    apps: [
      { name: "Mailchimp", description: "Retrieve campaign stats, add contacts to lists, trigger email sends, and update audience segments.", url: "https://mailchimp.com", logoUrl: "https://mailchimp.com/favicon.ico", tags: ["Email marketing", "Campaigns", "Lists"], actions: 22 },
      { name: "Klaviyo", description: "Look up Klaviyo subscriber profiles, add to flows, check campaign metrics, and suppress contacts.", url: "https://klaviyo.com", logoUrl: "https://klaviyo.com/favicon.ico", tags: ["E-commerce", "Email", "SMS"], actions: 19 },
      { name: "HubSpot Marketing", description: "Enroll contacts in HubSpot workflows, send marketing emails, and check campaign performance.", url: "https://hubspot.com", logoUrl: "https://hubspot.com/favicon.ico", tags: ["Inbound", "Workflows", "Content"], actions: 31 },
      { name: "SendGrid", description: "Send transactional emails, check delivery stats, manage suppression lists, and create templates.", url: "https://sendgrid.com", logoUrl: "https://sendgrid.com/favicon.ico", tags: ["Transactional", "Email API", "Delivery"], actions: 18 },
      { name: "Brevo", description: "Send Brevo email and SMS campaigns, add contacts, and monitor list health.", url: "https://brevo.com", logoUrl: "https://brevo.com/favicon.ico", tags: ["Email", "SMS", "Affordable"], actions: 16 },
      { name: "Buffer", description: "Schedule social posts, retrieve published content analytics, and manage posting queues.", url: "https://buffer.com", logoUrl: "https://buffer.com/favicon.ico", tags: ["Social scheduling", "Analytics", "Multi-channel"], actions: 14 },
      { name: "ActiveCampaign", description: "Trigger ActiveCampaign automations, add contacts, and check deal pipelines.", url: "https://activecampaign.com", logoUrl: "https://activecampaign.com/favicon.ico", tags: ["CRM", "Email", "Automations"], actions: 24 },
      { name: "Customer.io", description: "Send Customer.io event-triggered messages, update people attributes, and retrieve campaign data.", url: "https://customer.io", logoUrl: "https://customer.io/favicon.ico", tags: ["Behavioral", "Email", "Push"], actions: 13 },
    ],
  },
  {
    slug: "social-media",
    label: "Social Media",
    desc: "Read mentions, publish replies, and manage social presence across every platform.",
    count: 13,
    apps: [
      { name: "X (Twitter)", description: "Post tweets, read mention timelines, search hashtags, and engage with customers across X.", url: "https://twitter.com", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/120px-Logo_of_Twitter.svg.png", tags: ["Microblogging", "Mentions", "Search"], actions: 16 },
      { name: "LinkedIn", description: "Post updates, read company page analytics, and manage LinkedIn content from inside the workflow.", url: "https://linkedin.com", logoUrl: "https://linkedin.com/favicon.ico", tags: ["Professional", "B2B", "Posts"], actions: 14 },
      { name: "Instagram", description: "Publish posts and stories, read comments, and check Instagram Business analytics.", url: "https://instagram.com", logoUrl: "https://instagram.com/favicon.ico", tags: ["Photos", "Stories", "Business"], actions: 11 },
      { name: "Facebook", description: "Post to Facebook Pages, retrieve engagement data, and manage comments from customer pages.", url: "https://facebook.com", logoUrl: "https://facebook.com/favicon.ico", tags: ["Pages", "Ads", "Groups"], actions: 18 },
      { name: "YouTube", description: "Retrieve video analytics, respond to comments, and manage your YouTube channel content.", url: "https://youtube.com", logoUrl: "https://youtube.com/favicon.ico", tags: ["Video", "Comments", "Analytics"], actions: 12 },
      { name: "TikTok", description: "Access TikTok Business account data, post videos, and retrieve performance metrics.", url: "https://tiktok.com", logoUrl: "https://tiktok.com/favicon.ico", tags: ["Video", "Business", "Trends"], actions: 9 },
      { name: "Pinterest", description: "Create Pins, query board analytics, and manage Pinterest Business presence.", url: "https://pinterest.com", logoUrl: "https://pinterest.com/favicon.ico", tags: ["Visual", "Boards", "Shopping"], actions: 8 },
      { name: "Reddit", description: "Read subreddit posts, monitor brand mentions, and retrieve comment threads for community listening.", url: "https://reddit.com", logoUrl: "https://reddit.com/favicon.ico", tags: ["Communities", "Mentions", "Threads"], actions: 7 },
    ],
  },
]

export function getAppCategoryBySlug(slug: string): AppCategory | undefined {
  return APP_CATEGORIES.find((c) => c.slug === slug)
}

export function generateAppCategorySlugs() {
  return APP_CATEGORIES.map((c) => ({ category: c.slug }))
}
