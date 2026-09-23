export const PROJECTS_DATA = [
  // --- AI CATEGORY ---
  {
    id: '01',
    tag: 'GOOGLE MCP & AGENTIC AI',
    category: 'AI',
    title: 'Google AI Personal Assistant',
    subtitle: 'Autonomous Multi-Tool Agent over Google Services',
    description:
      'An autonomous reasoning agent leveraging Groq’s LLaMA 3.3-70B and Model Context Protocol (MCP) to orchestrate 20+ live tools across Gmail, Drive, Calendar, Photos, Tasks, and Contacts over OAuth 2.0.',
    stack: ['Python', 'Groq (LLaMA 3.3)', 'MCP Protocol', 'Google OAuth 2.0', 'JSON-RPC'],
    githubUrl: 'https://github.com/Sanju562586/GoogleServicesAgent',
    demoType: 'mcp-agent',
    architecture: 'Groq LLaMA 3.3 (70B) ➔ Custom MCP Server Subprocess ➔ JSON-RPC stdio ➔ Google OAuth 2.0 API Handlers',
    metrics: ['20+ Live MCP Tools', 'Sub-400ms Reasoning', '20-turn Context Memory'],
    highlights: [
      'AI Brain: Groq’s LLaMA 3.3-70B handles high-order reasoning and tool-calling with automatic model fallback on rate limits.',
      'MCP Architecture: A unified Google MCP server runs as a subprocess, exposing 20+ tools across Gmail, Drive, Calendar, Photos, Tasks, and Contacts over a JSON-RPC stdio channel.',
      'Live Google Integration: Full read/write access to Google services via OAuth 2.0; send emails, create calendar events, search Drive files in real time.',
      'Multi-turn Conversation: Maintains rolling chat history (up to 20 turns), auto-injects current IST time for scheduling, and handles malformed tool calls with regex fallback parsing.'
    ],
    cardStyle: 'card-1',
  },
  {
    id: '02',
    tag: 'AGENTIC DATA AI',
    category: 'AI',
    title: 'Agentic Natural Language Analysis Assistant',
    subtitle: 'Zero-Framework Autonomous CSV Data Reasoning Agent',
    description:
      'An end-to-end AI agent enabling natural language querying over arbitrary CSV datasets via a multi-step autonomous reasoning loop implemented from scratch.',
    stack: ['Python', 'Gemini API', 'Pandas', 'Streamlit', 'Seaborn'],
    githubUrl: 'https://github.com/Sanju562586/Data-Analyst-Agent',
    demoType: 'data-agent',
    architecture: 'User Natural Language Query ➔ Gemini 1.5 Flash Reasoning Loop ➔ Sandboxed Pandas Execution ➔ Dynamic Visual Charts',
    metrics: ['6 Schema Tools', 'Sandboxed Python Exec', 'Zero-Framework Agent Loop'],
    highlights: [
      'Built an end-to-end AI agent enabling natural language querying over arbitrary CSV datasets via a multi-step autonomous reasoning loop — implemented from scratch without any heavy orchestration framework.',
      'Designed 6 registered tool functions with structured JSON schemas consumed by the Gemini Flash API; results are injected back into LLM context across iterations until a complete response is formed.',
      'Tool capabilities include statistical summarisation, conditional row filtering, group-level aggregation, sandboxed Pandas code execution, and dynamic chart generation.',
      'Deployed as a live Streamlit web application on Streamlit Cloud with secure API secrets management.'
    ],
    cardStyle: 'card-2',
  },
  {
    id: '03',
    tag: 'RETRIEVAL AUGMENTATION',
    category: 'AI',
    title: 'AI Resume Q&A Assistant',
    subtitle: 'Modular FAISS Vector Search & LLM Extraction Engine',
    description:
      'A Retrieval-Augmented Generation (RAG) pipeline covering document parsing, chunking, embedding generation, and semantic vector search over a FAISS index.',
    stack: ['Python', 'LangChain', 'RAG', 'FAISS', 'LLMs'],
    githubUrl: 'https://github.com/Sanju562586/AI-Resume-Q-A-Assistant',
    demoType: 'rag-engine',
    architecture: 'Document Parsing (PDF/Docx) ➔ Recursive Chunking ➔ Embedding Generation ➔ FAISS Similarity Search ➔ Grounded LLM Response',
    metrics: ['<50ms Vector Search', 'Zero Downstream Coupling', 'Multi-Format Ingestion'],
    highlights: [
      'Built a Retrieval-Augmented Generation (RAG) pipeline covering document parsing, chunking, embedding generation, and semantic search over a FAISS vector index.',
      'Integrated LLMs to answer natural-language queries against resume content, enabling context-aware responses, skill extraction, and automated interview question generation.',
      'Designed a modular pipeline architecture allowing the embedding model or LLM backend to be swapped with zero downstream changes.'
    ],
    cardStyle: 'card-3',
  },

  // --- DEEP LEARNING CATEGORY ---
  {
    id: '04',
    tag: 'DEEP LEARNING & VLM',
    category: 'Deep Learning',
    title: 'Identity Document Intelligence System',
    subtitle: 'Fine-Tuned PaliGemma-3B with Dual-Stream Forgery Detection',
    description:
      'A multimodal document intelligence platform combining fine-tuned PaliGemma-3B (QLoRA/SFT), dual-stream forgery detection, and DPO alignment.',
    stack: ['PyTorch', 'PaliGemma-3B', 'QLoRA', 'PEFT', 'LoRA', 'DPO', 'ViT', 'OpenCV', 'Albumentations', 'TRL', 'W&B'],
    githubUrl: 'https://github.com/Sanju562586/Identity-Document-Intelligence-System',
    demoType: 'vlm-intel',
    architecture: 'Synthetic ID Degradation (5k+ docs) ➔ QLoRA SFT on PaliGemma-3B ➔ DPO Preference Alignment ➔ Dual-Stream ELA Forgery Detection',
    metrics: ['5,000+ Synthetic Docs', '24 Adversarial Conditions', 'Grad-CAM Tamper Heatmaps'],
    highlights: [
      'Generated 5,000+ synthetic ID document images across 8 degradation types using PIL & Albumentations, establishing an adversarial OCR benchmark across Tesseract, EasyOCR, and TrOCR.',
      'Fine-tuned PaliGemma-3B with QLoRA + SFT via HuggingFace TRL for structured field extraction (name, DOB, ID number) from noisy, real-world identity documents.',
      'Built a dual-stream forgery detection head fusing VLM vision encoder features with ELA noise maps, evaluated on AUROC and ECE with Grad-CAM tamper localization.',
      'Applied DPO preference alignment atop the SFT checkpoint to penalize overconfident predictions; benchmarked Base → SFT → SFT+DPO across 24 adversarial test conditions on W&B.'
    ],
    cardStyle: 'card-4',
  },
  {
    id: '05',
    tag: 'DEEP LEARNING & VLM',
    category: 'Deep Learning',
    title: 'Vision-Language Model for Document Q&A',
    subtitle: 'Multimodal Instruction Tuning on DocVQA & Rotated Scans',
    description:
      'Fine-tuned LLaVA-1.5 multimodal architecture on DocVQA and custom ID card image-QA pairs using LoRA on the LLM backbone with frozen vision encoders.',
    stack: ['PyTorch', 'LLaVA-1.5 / InternVL2', 'PEFT', 'LoRA', 'CLIP/SigLIP', 'DocVQA', 'bitsandbytes', 'Transformers'],
    githubUrl: 'https://github.com/Sanju562586/Vision-Language-model-for-document-Q-A',
    demoType: 'doc-vqa',
    architecture: 'DocVQA + ID Scans ➔ Frozen CLIP/SigLIP ViT ➔ Cross-Modal Projection MLP ➔ LoRA-adapted LLM Backbone',
    metrics: ['High ANLS Score', 'Rotated & Degraded Robustness', 'Quantized 4-bit LoRA'],
    highlights: [
      'Fine-tuned LLaVA-1.5 on DocVQA + custom ID card image-QA pairs using LoRA on the LLM backbone (frozen vision encoder), achieving structured field extraction from noisy, rotated, and low-quality document scans.',
      'Built a multimodal inference pipeline with cross-modal projection and chat-format instruction templates; evaluated on ANLS score and hallucination rate across unseen document types.',
      'Stress-tested on adversarial inputs (blur, rotation, compression artifacts) and documented failure modes with ablation across projector configurations.'
    ],
    cardStyle: 'card-1',
  },

  // --- MACHINE LEARNING CATEGORY ---
  {
    id: '06',
    tag: 'DISTRIBUTED ML & STREAMING',
    category: 'Machine Learning',
    title: 'Real-Time Transaction Fraud Scoring Platform',
    subtitle: 'Sub-50ms Risk Pipeline with Kafka, Spark & Guarded State Transitions',
    description:
      'A distributed transaction processing platform with live streaming risk scoring, guarded state transitions, and operational dashboards.',
    stack: ['Spark', 'Kafka', 'FastAPI', 'Scikit-learn', 'Docker', 'Python'],
    githubUrl: 'https://github.com/Sanju562586/Intelligent-Fraud-Detection',
    demoType: 'stream-fraud',
    architecture: 'Kafka Transaction Feed ➔ Spark Structured Streaming ➔ Scikit-learn Gradient Boosting Model ➔ FastAPI Guarded State Machine',
    metrics: ['<50ms P99 Latency', '10,000+ Events/Sec', 'Fault-Tolerant Checkpoints'],
    highlights: [
      'Distributed stream processing pipeline scoring credit transactions with sub-50ms latency.',
      'Trained Scikit-learn gradient boosting model integrated with Apache Spark Streaming and Kafka event brokers.',
      'Guarded state transition workflows with FastAPI microservices and Docker containerization for auditability and compliance.'
    ],
    cardStyle: 'card-3',
  },

  // --- WEB DEVELOPMENT CATEGORY ---
  {
    id: '07',
    tag: 'FULL-STACK WEB & REALTIME',
    category: 'Web Development',
    title: 'Campus Food Redistribution Network',
    subtitle: 'Zero-Race-Condition Transaction System with Socket.io & Gemini AI',
    description:
      'A real-time distributed web platform to eliminate campus food waste with role-based access control, zero-race-condition PostgreSQL transactions, and WebSocket broadcasting.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Socket.io', 'Google Gemini AI', 'TypeScript'],
    githubUrl: 'https://github.com/Sanju562586/CampusFoodRedistribution',
    demoType: 'realtime-web',
    architecture: 'Next.js Frontend ➔ Node.js API ➔ PostgreSQL Row-Locking Reservations ➔ Socket.io Real-Time Broadcast ➔ Gemini AI Dietary Matcher',
    metrics: ['0 Race Conditions', 'Instant Broadcasts', 'End-to-End QR Flow'],
    highlights: [
      'Architected a real-time distributed web platform to eliminate food waste across campus with role-based access for Admin, Donor, and Student users.',
      'Designed concurrent reservation system using PostgreSQL transactions with row-level locking — zero race conditions under simultaneous requests.',
      'Built event-driven real-time communication layer using WebSockets (Socket.io) enabling instant food availability broadcasts to all connected clients.',
      'Integrated Google Gemini AI for personalized dietary recommendations; implemented OTP authentication and QR-code pickup verification for secure end-to-end flows.'
    ],
    cardStyle: 'card-2',
  },
  {
    id: '08',
    tag: 'HIGH-PERFORMANCE BACKEND WEB',
    category: 'Web Development',
    title: 'High-Throughput Production URL Shortener',
    subtitle: 'Asynchronous Distributed Redirect Engine with Redis Caching',
    description:
      'A production-minded URL shortening service with fast redirects, meaningful analytics, and caching layers built for high-traffic read operations.',
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'REST API', 'Docker'],
    githubUrl: 'https://github.com/Sanju562586/Scalable-URL-Shortener',
    demoType: 'url-engine',
    architecture: 'FastAPI Async Endpoints ➔ Redis In-Memory Cache (Write-Through) ➔ PostgreSQL Relational Storage ➔ Docker Container Cluster',
    metrics: ['10,000+ QPS', 'Sub-5ms Redirects', 'Live Analytics Tracking'],
    highlights: [
      'Asynchronous FastAPI REST endpoints with Redis write-through caching achieving 10k+ QPS on standard hardware.',
      'PostgreSQL data persistence with relational indexing and automated click analytics tracking by geographic and device metadata.',
      'Docker containerized deployment with health checks, automated database migrations, and benchmark stress testing.'
    ],
    cardStyle: 'card-4',
  },
];
