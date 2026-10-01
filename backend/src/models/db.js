import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'flowmind_db.json');

// Initial seed enterprise database
const INITIAL_DATABASE = {
  summary: {
    activeWorkflows: 128,
    activeWorkflowsDelta: '+6.2%',
    workflowBottlenecks: 17,
    workflowBottlenecksDelta: '-11%',
    tasksAtRisk: 42,
    tasksAtRiskDelta: '-8%',
    aiAutomationRate: 64.8,
    aiAutomationRateDelta: '+14.2%',
    aiOperationalInsight: {
      title: "AI Operational Insight",
      content: "Finance approval workflows are taking 31% longer than average. Most delays occur between Manager Approval and Finance Review.",
      confidence: 94,
      targetWorkflowId: "WF-2045",
      primaryBottleneck: "Manager Approval",
      impact: "31% above normal processing time",
      recommendation: "Automate manager reminders after 4 hours and escalate after 5 hours."
    }
  },
  workflows: [
    {
      id: "WF-2045",
      name: "Finance Approval",
      department: "Finance",
      currentStage: "Manager Approval",
      owner: "Rajesh Kumar",
      progress: 38,
      slaDeadline: "1 hr left",
      riskLevel: "High",
      createdDate: "2026-09-30 08:30",
      description: "Quarterly budget allocations and high-value expense sign-offs for Q4 operational expenditures.",
      stages: [
        { name: "Request Created", status: "completed", duration: "12 mins", timestamp: "08:30 AM" },
        { name: "Document Validation", status: "completed", duration: "35 mins", timestamp: "09:05 AM" },
        { name: "Manager Approval", status: "bottleneck", duration: "5.4 hrs pending", isCurrent: true, pendingHours: 5.4, timestamp: "09:40 AM" },
        { name: "Finance Review", status: "pending", duration: "Estimated 1.2 hrs", timestamp: "Awaiting approval" },
        { name: "Completed", status: "pending", duration: "Final sign-off", timestamp: "Scheduled" }
      ],
      aiAnalysis: {
        currentBottleneck: "Manager Approval",
        reason: "Approval has remained pending for 5.4 hours, exceeding the department's normal processing time of 1.8 hours.",
        recommendation: "Send an automated reminder to the manager and escalate to VP Finance if no response is received within 60 minutes.",
        confidence: 96,
        impact: "31% delay on monthly close cycle"
      },
      documents: [
        { name: "Q4_Budget_Allocation.pdf", size: "2.4 MB", type: "PDF", status: "Verified" },
        { name: "Vendor_Cost_Breakdown.xlsx", size: "840 KB", type: "Spreadsheet", status: "Parsed" }
      ],
      approvals: [
        { role: "Finance Manager", approver: "Rajesh Kumar", status: "Pending", pendingTime: "5.4 hrs", sla: "Breached" },
        { role: "VP Financial Planning", approver: "Sunita Rao", status: "Queued", pendingTime: "-", sla: "On Track" }
      ],
      auditHistory: [
        { action: "Workflow initiated", user: "Rajesh Kumar", time: "Sep 30, 08:30 AM" },
        { action: "Document validation passed AI OCR check", user: "FlowMind AI Bot", time: "Sep 30, 09:05 AM" },
        { action: "Manager approval notification dispatched", user: "System", time: "Sep 30, 09:40 AM" },
        { action: "Bottleneck threshold detected (4.0 hrs exceeded)", user: "FlowMind AI Engine", time: "Sep 30, 01:40 PM" }
      ]
    },
    {
      id: "WF-2048",
      name: "Employee Onboarding",
      department: "Human Resources",
      currentStage: "Background Verification",
      owner: "Priya Shah",
      progress: 72,
      slaDeadline: "4 hrs left",
      riskLevel: "Medium",
      createdDate: "2026-09-29 11:15",
      description: "End-to-end recruitment transition for Senior Cloud Systems Architect including IT provisioning and HR benefits.",
      stages: [
        { name: "Offer Accepted", status: "completed", duration: "Instant", timestamp: "Sep 29" },
        { name: "Document Collection", status: "completed", duration: "1.5 days", timestamp: "Sep 30" },
        { name: "Background Verification", status: "in-progress", duration: "2.1 days", isCurrent: true, timestamp: "Today" },
        { name: "IT Access Provisioning", status: "pending", duration: "Est. 3 hrs", timestamp: "Queued" },
        { name: "Manager Welcome", status: "pending", duration: "Est. 30 mins", timestamp: "Queued" },
        { name: "Employee Ready", status: "pending", duration: "Day 1 kickoff", timestamp: "Scheduled" }
      ],
      aiAnalysis: {
        currentBottleneck: "Background Verification Vendor Portal",
        reason: "Third-party identity clearance turnaround time average is 28 hours vs expected 18 hours.",
        recommendation: "Auto-trigger dual-verification channel to prevent onboarding date slippage.",
        confidence: 91,
        impact: "Medium operational SLA impact"
      },
      documents: [
        { name: "Employment_Offer_Letter_Signed.pdf", size: "1.8 MB", type: "PDF", status: "Verified" },
        { name: "Identity_Proof_Passports.pdf", size: "3.2 MB", type: "PDF", status: "Verified" }
      ],
      approvals: [
        { role: "HR Operations Lead", approver: "Priya Shah", status: "Approved", pendingTime: "-", sla: "Met" },
        { role: "Department Head", approver: "Vikram Sen", status: "Pending", pendingTime: "1.2 hrs", sla: "On Track" }
      ],
      auditHistory: [
        { action: "Candidate accepted offer", user: "Talent Portal", time: "Sep 29, 11:15 AM" },
        { action: "Documents uploaded and classified", user: "FlowMind AI", time: "Sep 29, 02:40 PM" },
        { action: "Background check initiated", user: "Priya Shah", time: "Sep 30, 09:10 AM" }
      ]
    },
    {
      id: "WF-2049",
      name: "Laptop Procurement",
      department: "Information Technology",
      currentStage: "Manager Approval",
      owner: "Rahul Mehta",
      progress: 41,
      slaDeadline: "2 hrs left",
      riskLevel: "High",
      createdDate: "2026-10-01 07:15",
      description: "MacBook Pro M3 Max 64GB hardware requisition for Engineering Tech Lead.",
      stages: [
        { name: "Requisition Submitted", status: "completed", duration: "10 mins", timestamp: "07:15 AM" },
        { name: "Hardware Inventory Check", status: "completed", duration: "25 mins", timestamp: "07:40 AM" },
        { name: "Manager Approval", status: "bottleneck", duration: "3.8 hrs pending", isCurrent: true, pendingHours: 3.8, timestamp: "08:05 AM" },
        { name: "Procurement Dispatch", status: "pending", duration: "Est. 2 hrs", timestamp: "Awaiting sign-off" },
        { name: "Asset Provisioned", status: "pending", duration: "Est. 1 hr", timestamp: "Queued" }
      ],
      aiAnalysis: {
        currentBottleneck: "Manager Approval",
        reason: "Cost exceeds ₹2,00,000 threshold, requiring dual-tier sign-off currently held with Engineering Director.",
        recommendation: "Issue instant mobile notification with 1-click Slack/Teams approval link.",
        confidence: 95,
        impact: "Hardware delivery delayed by 24 hours if not approved by 2 PM."
      },
      documents: [
        { name: "Hardware_Quote_Dell_Apple.pdf", size: "1.2 MB", type: "PDF", status: "Verified" }
      ],
      approvals: [
        { role: "Engineering Director", approver: "Kavita Rao", status: "Pending", pendingTime: "3.8 hrs", sla: "At Risk" }
      ],
      auditHistory: [
        { action: "Hardware ticket opened", user: "Rahul Mehta", time: "Oct 1, 07:15 AM" },
        { action: "Inventory check: Zero stock in Bangalore hub", user: "Asset System", time: "Oct 1, 07:40 AM" }
      ]
    },
    {
      id: "WF-2050",
      name: "Expense Reimbursement",
      department: "Finance",
      currentStage: "Finance Review",
      owner: "Ananya Patel",
      progress: 83,
      slaDeadline: "1 day left",
      riskLevel: "Low",
      createdDate: "2026-09-28 14:20",
      description: "Client on-site travel expenses claim ₹84,000 for European Partner Summit.",
      stages: [
        { name: "Expense Submitted", status: "completed", duration: "5 mins", timestamp: "Sep 28" },
        { name: "Receipt OCR & Policy Check", status: "completed", duration: "45 secs", timestamp: "Sep 28" },
        { name: "Manager Approval", status: "completed", duration: "4.2 hrs", timestamp: "Sep 29" },
        { name: "Finance Review", status: "in-progress", duration: "45 mins active", isCurrent: true, timestamp: "Today" },
        { name: "Disbursement Scheduled", status: "pending", duration: "Est. 4 hrs", timestamp: "Pending batch" }
      ],
      aiAnalysis: {
        currentBottleneck: "None (On Track)",
        reason: "All 14 receipts verified by FlowMind OCR engine with 99.8% confidence match against corporate travel policy.",
        recommendation: "Execute automated batch payment during 4:00 PM corporate banking run.",
        confidence: 98,
        impact: "Zero SLA breach risk"
      },
      documents: [
        { name: "Travel_Receipts_Consolidated.pdf", size: "4.1 MB", type: "PDF", status: "OCR Verified" },
        { name: "Hotel_Boarding_Passes.pdf", size: "1.9 MB", type: "PDF", status: "OCR Verified" }
      ],
      approvals: [
        { role: "Line Manager", approver: "Devendra Joshi", status: "Approved", pendingTime: "-", sla: "Met" },
        { role: "Finance Auditor", approver: "Ananya Patel", status: "In Review", pendingTime: "45 mins", sla: "On Track" }
      ],
      auditHistory: [
        { action: "Expense claim filed", user: "Sunil Verma", time: "Sep 28, 02:20 PM" },
        { action: "Auto-audited ₹84,000 against policy rules", user: "FlowMind AI", time: "Sep 28, 02:21 PM" }
      ]
    },
    {
      id: "WF-2051",
      name: "Purchase Approval",
      department: "Procurement",
      currentStage: "Vendor Validation",
      owner: "Neha Sharma",
      progress: 58,
      slaDeadline: "6 hrs left",
      riskLevel: "Medium",
      createdDate: "2026-09-30 16:00",
      description: "Annual Enterprise SaaS renewal for Cloud Infrastructure APM tooling.",
      stages: [
        { name: "PO Generated", status: "completed", duration: "15 mins", timestamp: "Sep 30" },
        { name: "Budget Verification", status: "completed", duration: "2 hrs", timestamp: "Sep 30" },
        { name: "Vendor Validation", status: "in-progress", duration: "3.5 hrs pending", isCurrent: true, timestamp: "Today" },
        { name: "Procurement Head Sign", status: "pending", duration: "Est. 1 hr", timestamp: "Queued" },
        { name: "Contract Dispatched", status: "pending", duration: "Est. 30 mins", timestamp: "Queued" }
      ],
      aiAnalysis: {
        currentBottleneck: "Vendor Tax Residency Certificate",
        reason: "Supplier documentation missing updated GSTIN/VAT withholding certification.",
        recommendation: "Automate automated supplier notification to fetch renewed W-8BEN/GST filing.",
        confidence: 89,
        impact: "Delayed procurement cycle by 2 business days"
      },
      documents: [
        { name: "Master_Services_Agreement_Draft.pdf", size: "3.8 MB", type: "PDF", status: "Under Legal Review" }
      ],
      approvals: [
        { role: "Department Head", approver: "Siddharth Nair", status: "Approved", pendingTime: "-", sla: "Met" },
        { role: "Procurement Lead", approver: "Neha Sharma", status: "Pending", pendingTime: "3.5 hrs", sla: "On Track" }
      ],
      auditHistory: [
        { action: "Purchase requisition initiated", user: "DevOps Lead", time: "Sep 30, 04:00 PM" }
      ]
    },
    {
      id: "WF-2052",
      name: "IT Access Request",
      department: "Information Technology",
      currentStage: "Security Review",
      owner: "Amit Verma",
      progress: 90,
      slaDeadline: "12 hrs left",
      riskLevel: "Low",
      createdDate: "2026-10-01 06:45",
      description: "Production database read-only replica access for BI Analyst Team.",
      stages: [
        { name: "Access Request Form", status: "completed", duration: "5 mins", timestamp: "06:45 AM" },
        { name: "Manager Approval", status: "completed", duration: "1.1 hrs", timestamp: "07:55 AM" },
        { name: "Security Review", status: "in-progress", duration: "45 mins", isCurrent: true, timestamp: "08:40 AM" },
        { name: "IAM Role Binding", status: "pending", duration: "Est. 2 mins auto", timestamp: "Queued" }
      ],
      aiAnalysis: {
        currentBottleneck: "None",
        reason: "Least-privilege policy validated against role BI-ANALYST-RO. Safe for auto-binding.",
        recommendation: "Execute automated IAM binding via AWS/Okta webhook.",
        confidence: 97,
        impact: "Zero delay"
      },
      documents: [
        { name: "Data_Access_Compliance_Declaration.pdf", size: "450 KB", type: "PDF", status: "Signed" }
      ],
      approvals: [
        { role: "Security Officer", approver: "Amit Verma", status: "In Review", pendingTime: "45 mins", sla: "On Track" }
      ],
      auditHistory: [
        { action: "Request submitted via Slack integration", user: "Rohit Sen", time: "Oct 1, 06:45 AM" }
      ]
    }
  ],
  bottlenecks: [
    {
      id: "BN-01",
      workflow: "Finance Approval",
      averageTime: "8.4 hrs",
      delayedTasks: 23,
      slaRisk: "High",
      recommendation: "Automate manager reminders",
      primaryStep: "Manager Approval",
      department: "Finance"
    },
    {
      id: "BN-02",
      workflow: "HR Onboarding",
      averageTime: "6.2 hrs",
      delayedTasks: 14,
      slaRisk: "Medium",
      recommendation: "Pre-fill IT access forms upon offer acceptance",
      primaryStep: "Document Verification",
      department: "Human Resources"
    },
    {
      id: "BN-03",
      workflow: "IT Access Request",
      averageTime: "5.8 hrs",
      delayedTasks: 19,
      slaRisk: "High",
      recommendation: "Auto-provision standard role bundles",
      primaryStep: "Security Review",
      department: "Information Technology"
    },
    {
      id: "BN-04",
      workflow: "Purchase Approval",
      averageTime: "4.1 hrs",
      delayedTasks: 8,
      slaRisk: "Low",
      recommendation: "Tiered auto-approval for under ₹50,000",
      primaryStep: "Vendor Validation",
      department: "Procurement"
    },
    {
      id: "BN-05",
      workflow: "Expense Reimbursement",
      averageTime: "3.5 hrs",
      delayedTasks: 11,
      slaRisk: "Medium",
      recommendation: "Optical OCR verification with receipt matching",
      primaryStep: "Finance Review",
      department: "Finance"
    }
  ],
  tasks: [
    {
      id: "TSK-401",
      title: "Approve Q4 Operational Budget Sign-off",
      workflowId: "WF-2045",
      workflow: "Finance Approval",
      owner: "Rajesh Kumar",
      department: "Finance",
      due: "In 1 hour",
      status: "At Risk",
      aiRisk: "High",
      recommendedAction: "Escalate to VP Finance if no response within 60 mins"
    },
    {
      id: "TSK-402",
      title: "Verify Candidate Identification & Education Records",
      workflowId: "WF-2048",
      workflow: "Employee Onboarding",
      owner: "Priya Shah",
      department: "Human Resources",
      due: "In 4 hours",
      status: "In Progress",
      aiRisk: "Medium",
      recommendedAction: "Ping third-party identity API for instant verification"
    },
    {
      id: "TSK-403",
      title: "Sign MacBook Pro Hardware Requisition",
      workflowId: "WF-2049",
      workflow: "Laptop Procurement",
      owner: "Rahul Mehta",
      department: "Information Technology",
      due: "In 2 hours",
      status: "At Risk",
      aiRisk: "High",
      recommendedAction: "Dispatch urgent mobile notification with 1-click approval"
    },
    {
      id: "TSK-404",
      title: "Perform Receipt Tax Audit on ₹84,000 Travel Claim",
      workflowId: "WF-2050",
      workflow: "Expense Reimbursement",
      owner: "Ananya Patel",
      department: "Finance",
      due: "Tomorrow, 5 PM",
      status: "In Progress",
      aiRisk: "Low",
      recommendedAction: "Auto-approve matched line items and disburse"
    },
    {
      id: "TSK-405",
      title: "Verify W-8BEN Tax Form for Cloud Vendor",
      workflowId: "WF-2051",
      workflow: "Purchase Approval",
      owner: "Neha Sharma",
      department: "Procurement",
      due: "In 6 hours",
      status: "In Progress",
      aiRisk: "Medium",
      recommendedAction: "Request digital tax signature via vendor portal"
    },
    {
      id: "TSK-406",
      title: "Provision BI Replica Read-Only Credentials",
      workflowId: "WF-2052",
      workflow: "IT Access Request",
      owner: "Amit Verma",
      department: "Information Technology",
      due: "In 12 hours",
      status: "Pending",
      aiRisk: "Low",
      recommendedAction: "Trigger automated IAM webhook provisioning"
    },
    {
      id: "TSK-407",
      title: "Quarterly Audit Report Compilation",
      workflowId: "WF-2045",
      workflow: "Finance Approval",
      owner: "Rajesh Kumar",
      department: "Finance",
      due: "Overdue by 2 hours",
      status: "Overdue",
      aiRisk: "High",
      recommendedAction: "Generate automated ledger audit summary"
    },
    {
      id: "TSK-408",
      title: "HR Orientation Welcome Pack Dispatch",
      workflowId: "WF-2048",
      workflow: "Employee Onboarding",
      owner: "Priya Shah",
      department: "Human Resources",
      due: "Yesterday",
      status: "Recently Completed",
      aiRisk: "Low",
      recommendedAction: "Archive onboarding kit tracking number"
    }
  ],
  approvals: [
    {
      id: "APP-101",
      title: "Expense Approval",
      amount: "₹84,000",
      department: "Finance",
      stage: "Manager Approval",
      pendingTime: "4.2 hrs pending",
      risk: "High Risk",
      owner: "Sunil Verma",
      approver: "Rajesh Kumar",
      workflowId: "WF-2050",
      status: "Pending",
      aiRecommendation: "Send reminder"
    },
    {
      id: "APP-102",
      title: "Laptop Hardware Purchase",
      amount: "₹1,25,000",
      department: "Information Technology",
      stage: "IT Director Approval",
      pendingTime: "3.8 hrs pending",
      risk: "High Risk",
      owner: "Rahul Mehta",
      approver: "Kavita Rao",
      workflowId: "WF-2049",
      status: "Pending",
      aiRecommendation: "Trigger 1-click mobile authorization"
    },
    {
      id: "APP-103",
      title: "Annual APM Tooling Enterprise License",
      amount: "₹4,50,000",
      department: "Procurement",
      stage: "VP Procurement Sign-off",
      pendingTime: "6.8 hrs pending",
      risk: "High Risk",
      owner: "Neha Sharma",
      approver: "Siddharth Nair",
      workflowId: "WF-2051",
      status: "Pending",
      aiRecommendation: "Escalate to CFO review queue"
    },
    {
      id: "APP-104",
      title: "Special Paternity Leave Request",
      amount: "N/A",
      department: "Human Resources",
      stage: "HR Lead Approval",
      pendingTime: "1.2 hrs pending",
      risk: "Low Risk",
      owner: "Priya Shah",
      approver: "Vikram Sen",
      workflowId: "WF-2048",
      status: "Pending",
      aiRecommendation: "Auto-approve based on company 14-day policy"
    },
    {
      id: "APP-105",
      title: "Database Replica BI Access",
      amount: "N/A",
      department: "Information Technology",
      stage: "Security Officer Sign-off",
      pendingTime: "45 mins pending",
      risk: "Low Risk",
      owner: "Amit Verma",
      approver: "Amit Verma",
      workflowId: "WF-2052",
      status: "Recently Completed",
      aiRecommendation: "Auto-bound to IAM policy BI-ANALYST-RO"
    }
  ],
  documents: [
    {
      id: "DOC-301",
      title: "Purchase Request — Cloud APM Renewal",
      type: "Purchase Request",
      department: "Procurement",
      uploaded: "2026-09-30 16:15",
      aiStatus: "Verified & Classified",
      statusBadge: "Verified",
      size: "3.8 MB",
      format: "PDF",
      summary: "Annual contract renewal for enterprise observability platform covering 1,200 microservices.",
      extractedFields: {
        "Supplier": "Datadog Enterprise Inc.",
        "Total Value": "₹4,50,000",
        "Payment Terms": "Net 30",
        "Tax ID": "GSTIN29AAACB1234F1Z"
      }
    },
    {
      id: "DOC-302",
      title: "Employee Offer Letter — Lead Architect",
      type: "Employee Offer Letter",
      department: "Human Resources",
      uploaded: "2026-10-01 09:20",
      aiStatus: "Pending Routing",
      statusBadge: "Action Needed",
      size: "1.8 MB",
      format: "PDF",
      summary: "Signed offer letter for Senior Cloud Systems Architect with joining date October 15, 2026.",
      extractedFields: {
        "Candidate": "Arjun Singhania",
        "Role": "Lead Cloud Architect",
        "Base Compensation": "₹38,00,000 / yr",
        "Notice Period": "30 days"
      }
    },
    {
      id: "DOC-303",
      title: "Expense Report — European Partner Summit",
      type: "Expense Report",
      department: "Finance",
      uploaded: "2026-09-28 14:20",
      aiStatus: "OCR Extracted",
      statusBadge: "Processed",
      size: "4.1 MB",
      format: "PDF",
      summary: "14 validated expense receipts spanning air travel, lodging, and client dinners.",
      extractedFields: {
        "Total Claim": "₹84,000",
        "Currency": "INR / EUR",
        "Policy Violations": "None detected",
        "Tax Deduction Eligible": "Yes"
      }
    },
    {
      id: "DOC-304",
      title: "Hardware Requisition Invoice — Apple MacBook M3",
      type: "Invoice",
      department: "Information Technology",
      uploaded: "2026-10-01 07:20",
      aiStatus: "Matched to PO-892",
      statusBadge: "Matched",
      size: "1.2 MB",
      format: "PDF",
      summary: "Authorized vendor invoice for 64GB Unified Memory developer workstation.",
      extractedFields: {
        "Vendor": "Apple Authorised Enterprise Retail",
        "Invoice No": "INV-2026-9812",
        "Total Amount": "₹2,14,000",
        "Asset Serial": "C02G9012K87"
      }
    },
    {
      id: "DOC-305",
      title: "Corporate Data Classification Policy 2026",
      type: "Policy Document",
      department: "Operations",
      uploaded: "2026-09-25 10:00",
      aiStatus: "Indexed & Vectorized",
      statusBadge: "Active Policy",
      size: "5.4 MB",
      format: "PDF",
      summary: "Standard governance framework for handling confidential customer PII, telemetry, and access tokens.",
      extractedFields: {
        "Classification": "Confidential - Internal Use",
        "Review Cycle": "Annual",
        "Owner": "Chief Information Security Officer"
      }
    }
  ],
  automations: [
    {
      id: "AUTO-01",
      title: "Automatic Approval Reminder",
      description: "Monitors pending approvals and dispatches automated notifications at 4-hour thresholds, escalating to secondary sign-offs at 5 hours.",
      status: "Active",
      executions: 1420,
      successRate: 98.4,
      lastRun: "4 mins ago",
      triggerType: "Threshold / Timer",
      department: "Organization-wide",
      enabled: true
    },
    {
      id: "AUTO-02",
      title: "Delayed Task Escalation",
      description: "Detects tasks within 2 hours of SLA breach and automatically creates escalation tickets in leadership dashboard.",
      status: "Active",
      executions: 842,
      successRate: 96.1,
      lastRun: "12 mins ago",
      triggerType: "SLA Predictive Risk",
      department: "Operations",
      enabled: true
    },
    {
      id: "AUTO-03",
      title: "Document Classification",
      description: "Uses multi-modal AI to parse uploaded invoices, contracts, and letters, auto-tagging metadata and routing to responsible departments.",
      status: "Active",
      executions: 3180,
      successRate: 99.2,
      lastRun: "1 min ago",
      triggerType: "Event / Upload",
      department: "Finance & Legal",
      enabled: true
    },
    {
      id: "AUTO-04",
      title: "Employee Onboarding Routing",
      description: "Triggers sequential background check verification, automated laptop asset reservation, and Slack workspace invitations upon offer acceptance.",
      status: "Active",
      executions: 654,
      successRate: 97.8,
      lastRun: "22 mins ago",
      triggerType: "HR State Transition",
      department: "Human Resources",
      enabled: true
    },
    {
      id: "AUTO-05",
      title: "Expense Approval Routing",
      description: "Auto-approves verified expense claims below ₹10,000 with 100% receipt OCR match, bypassing manual review queues.",
      status: "Active",
      executions: 2190,
      successRate: 98.9,
      lastRun: "8 mins ago",
      triggerType: "Heuristic OCR Validation",
      department: "Finance",
      enabled: true
    },
    {
      id: "AUTO-06",
      title: "Duplicate Task Detection",
      description: "Cross-checks new incoming workflow requests with existing active tickets to flag redundant submissions and merge audit logs.",
      status: "Inactive",
      executions: 412,
      successRate: 94.5,
      lastRun: "2 hours ago",
      triggerType: "NLP Semantic Match",
      department: "Support & IT",
      enabled: false
    }
  ],
  team: [
    {
      id: "USR-01",
      name: "Priya Shah",
      role: "Lead People Operations",
      department: "Human Resources",
      email: "priya.shah@flowmind.ai",
      workload: 88,
      activeWorkflows: 8,
      pendingTasks: 14,
      slaRisk: "Medium",
      avatarInitials: "PS",
      recentActivity: "Reviewed background checks for 3 candidates"
    },
    {
      id: "USR-02",
      name: "Rahul Mehta",
      role: "IT Infrastructure Manager",
      department: "Information Technology",
      email: "rahul.mehta@flowmind.ai",
      workload: 94,
      activeWorkflows: 12,
      pendingTasks: 19,
      slaRisk: "High",
      avatarInitials: "RM",
      recentActivity: "Requisitioned 5 developer workstations"
    },
    {
      id: "USR-03",
      name: "Ananya Patel",
      role: "Senior Financial Analyst",
      department: "Finance",
      email: "ananya.patel@flowmind.ai",
      workload: 76,
      activeWorkflows: 9,
      pendingTasks: 7,
      slaRisk: "Low",
      avatarInitials: "AP",
      recentActivity: "Audited European summit travel claims"
    },
    {
      id: "USR-04",
      name: "Rajesh Kumar",
      role: "Financial Controller",
      department: "Finance",
      email: "rajesh.kumar@flowmind.ai",
      workload: 92,
      activeWorkflows: 14,
      pendingTasks: 23,
      slaRisk: "High",
      avatarInitials: "RK",
      recentActivity: "Quarterly budget sign-offs pending"
    },
    {
      id: "USR-05",
      name: "Neha Sharma",
      role: "Procurement Lead",
      department: "Procurement",
      email: "neha.sharma@flowmind.ai",
      workload: 68,
      activeWorkflows: 6,
      pendingTasks: 5,
      slaRisk: "Low",
      avatarInitials: "NS",
      recentActivity: "Negotiating APM enterprise renewal"
    },
    {
      id: "USR-06",
      name: "Amit Verma",
      role: "InfoSec & Compliance Officer",
      department: "Information Technology",
      email: "amit.verma@flowmind.ai",
      workload: 81,
      activeWorkflows: 7,
      pendingTasks: 9,
      slaRisk: "Low",
      avatarInitials: "AV",
      recentActivity: "Approved BI replica database credentials"
    }
  ],
  notifications: [
    {
      id: "NOTIF-01",
      title: "AI Bottleneck Detected",
      message: "AI detected a bottleneck in Finance Approval. Manager approval pending for 5.4 hours.",
      type: "bottleneck",
      time: "10 mins ago",
      read: false,
      workflowId: "WF-2045"
    },
    {
      id: "NOTIF-02",
      title: "SLA Deadline Warning",
      message: "WF-2049 (Laptop Procurement) is approaching its SLA deadline in 2 hours.",
      type: "warning",
      time: "25 mins ago",
      read: false,
      workflowId: "WF-2049"
    },
    {
      id: "NOTIF-03",
      title: "Escalation Required",
      message: "3 tasks require escalation across Finance and IT access queues.",
      type: "escalation",
      time: "1 hour ago",
      read: false,
      workflowId: "WF-2045"
    },
    {
      id: "NOTIF-04",
      title: "Automation Opportunity Detected",
      message: "New automation opportunity detected: Pre-fill IT access forms upon offer acceptance.",
      type: "opportunity",
      time: "2 hours ago",
      read: true,
      workflowId: "WF-2048"
    }
  ],
  analytics: {
    workflowCompletionRate: 91.4,
    workflowCompletionRateDelta: "+3.2%",
    averageWorkflowTime: "4.8 hrs",
    averageWorkflowTimeDelta: "-18.5%",
    slaCompliance: 93.8,
    slaComplianceDelta: "+5.1%",
    bottleneckFrequency: "13.2%",
    bottleneckFrequencyDelta: "-22.4%",
    automationImpact: "3,840 hrs saved / mo",
    automationImpactDelta: "+24.0%",
    aiRecommendationAdoption: 87.2,
    aiRecommendationAdoptionDelta: "+9.6%",
    timeSeriesPerformance: [
      { day: "Mon", completed: 42, delayed: 6, atRisk: 11 },
      { day: "Tue", completed: 58, delayed: 8, atRisk: 9 },
      { day: "Wed", completed: 64, delayed: 5, atRisk: 14 },
      { day: "Thu", completed: 78, delayed: 7, atRisk: 12 },
      { day: "Fri", completed: 86, delayed: 4, atRisk: 8 },
      { day: "Sat", completed: 34, delayed: 2, atRisk: 3 },
      { day: "Sun", completed: 28, delayed: 1, atRisk: 2 }
    ],
    departmentBottlenecks: [
      { department: "Finance", delayHours: 8.4, bottlenecks: 7, volume: 142 },
      { department: "Human Resources", delayHours: 6.2, bottlenecks: 4, volume: 88 },
      { department: "Information Technology", delayHours: 5.8, bottlenecks: 5, volume: 165 },
      { department: "Procurement", delayHours: 4.1, bottlenecks: 2, volume: 74 },
      { department: "Operations", delayHours: 2.8, bottlenecks: 1, volume: 92 }
    ],
    slaRiskDistribution: [
      { name: "Low Risk", count: 82, percentage: 64, color: "#15803D" },
      { name: "Medium Risk", count: 29, percentage: 23, color: "#B45309" },
      { name: "High Risk", count: 17, percentage: 13, color: "#DC2626" }
    ],
    automationSavings: [
      { month: "May", manualHours: 4200, automatedHours: 1900 },
      { month: "Jun", manualHours: 3900, automatedHours: 2400 },
      { month: "Jul", manualHours: 3600, automatedHours: 2900 },
      { month: "Aug", manualHours: 3200, automatedHours: 3400 },
      { month: "Sep", manualHours: 2800, automatedHours: 3840 }
    ]
  }
};

class Database {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Could not read existing data file, initializing fresh database');
    }
    this.saveData(INITIAL_DATABASE);
    return JSON.parse(JSON.stringify(INITIAL_DATABASE));
  }

  saveData(dataToSave = this.data) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving data to disk:', err);
    }
  }

  get(collection) {
    return this.data[collection] || [];
  }

  set(collection, items) {
    this.data[collection] = items;
    this.saveData();
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATABASE));
    this.saveData();
    return this.data;
  }
}

const db = new Database();
export default db;
