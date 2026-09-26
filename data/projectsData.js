export const PROJECTS_DATA = [
  // --- 01: DOCMIND — NEURAL DOCUMENT INTELLIGENCE & HYBRID RAG ---
  {
    id: '01',
    tag: 'NEURAL RAG & DOCUMENT AI',
    category: 'AI',
    title: 'DocMind',
    subtitle: 'Hierarchical Ingestion, Hybrid RRF Neural Reranking & Resilient Multi-LLM Router',
    description:
      'A production-grade, document-grounded intelligence platform featuring hierarchical parent-child chunking, hybrid BM25 + dense bi-encoder retrieval with cross-encoder reranking, zero-downtime multi-LLM failover, and global cross-session neural memory.',
    stack: [
      'Python 3.11+',
      'FastAPI',
      'Next.js 16',
      'React 19',
      'PyTorch',
      'Sentence Transformers',
      'BM25Okapi',
      'Cross-Encoder',
      'Google Gemini',
      'Groq (LLaMA 3.3 70B)',
      'OpenRouter',
      'PostgreSQL / SQLite (WAL)',
      'Docker',
      'TypeScript',
      'Tailwind CSS',
      'SSE Streaming',
    ],
    githubUrl: 'https://github.com/Sanju562586/DocMind',
    liveUrl: 'https://doc-mind-pi-umber.vercel.app/',
    demoType: 'neural-rag',
    architecture:
      'Multi-Format Ingestion (PDF, DOCX, XLSX) ➔ Dual-Layer Parent-Child Chunking (512t/128t) ➔ Hybrid Retrieval (BM25Okapi + all-MiniLM-L6-v2 RRF) ➔ Cross-Encoder Reranking (ms-marco-MiniLM) ➔ Resilient Multi-LLM Router (Gemini → Groq → OpenRouter) ➔ Real-Time SSE Token Streaming & Cross-Session Neural Memory',
    metrics: ['Dual-Layer 512t/128t Chunks', 'Zero-Downtime Failover', 'Real-Time SSE Streaming'],
    highlights: [
      'Hierarchical Ingestion & Chunking: Parses multi-format files (PDF, DOCX, XLSX) via semantic boundary detection and dual-layer parent-child chunking (512t/128t) with contextual prefix injection.',
      'Hybrid Retrieval & Neural Reranking: Combines BM25Okapi lexical search and dense bi-encoder embeddings via RRF, refined by cross-encoder reranking and parent context expansion.',
      'Resilient Multi-LLM Router & Memory: Implements cascading zero-downtime failover across Gemini, Groq, and OpenRouter, backed by cross-session neural vector memory for long-term recall.',
      'Full-Stack Streaming & Persistence: High-throughput FastAPI backend with real-time SSE token streaming and PostgreSQL/SQLite WAL persistence, paired with a Next.js 16 / React 19 glassmorphic UI.'
    ],
    cardStyle: 'card-1',
  },

  // --- 02: VISION-LANGUAGE MODEL FOR DOCUMENT Q&A ---
  {
    id: '02',
    tag: 'DEEP LEARNING & VLM',
    category: 'Deep Learning',
    title: 'Vision-Language model for document Q&A',
    subtitle: 'Multimodal Instruction Tuning on DocVQA & Rotated Document Scans',
    description:
      'Fine-tuned LLaVA-1.5 multimodal architecture on DocVQA and custom ID card image-QA pairs using LoRA on the LLM backbone with frozen vision encoders, achieving structured field extraction from noisy, rotated, and low-quality document scans.',
    stack: [
      'PyTorch',
      'LLaVA-1.5 / InternVL2',
      'HuggingFace PEFT',
      'LoRA',
      'CLIP/SigLIP',
      'DocVQA',
      'bitsandbytes',
      'Transformers',
    ],
    githubUrl: 'https://github.com/Sanju562586/Vision-Language-model-for-document-Q-A',
    liveUrl: null, // No live deployment available
    demoType: 'doc-vqa',
    architecture: 'DocVQA + ID Card Scans ➔ Frozen CLIP/SigLIP Vision Encoder ➔ Cross-Modal Projection MLP ➔ LoRA-adapted LLM Backbone',
    metrics: ['High ANLS Score', 'Rotated Scan Robustness', '4-bit LoRA Adaptation'],
    highlights: [
      'Fine-tuned LLaVA-1.5 on DocVQA + custom ID card image-QA pairs using LoRA on the LLM backbone (frozen vision encoder), achieving structured field extraction from noisy, rotated, and low-quality document scans.',
      'Built a multimodal inference pipeline with cross-modal projection and chat-format instruction templates; evaluated on ANLS score and hallucination rate across unseen document types.',
      'Stress-tested on adversarial inputs (blur, rotation, compression artifacts) and documented failure modes with ablation across projector configurations.'
    ],
    cardStyle: 'card-2',
  },

  // --- 03: IDENTITY DOCUMENT INTELLIGENCE SYSTEM ---
  {
    id: '03',
    tag: 'DEEP LEARNING & VLM',
    category: 'Deep Learning',
    title: 'Identity Document Intelligence System',
    subtitle: 'Fine-Tuned PaliGemma-3B with Dual-Stream Forgery Detection & DPO',
    description:
      'A multimodal document intelligence platform combining fine-tuned PaliGemma-3B (QLoRA/SFT), dual-stream forgery detection, and DPO alignment across 24 adversarial test conditions.',
    stack: [
      'PyTorch',
      'PaliGemma-3B',
      'QLoRA',
      'PEFT',
      'LoRA',
      'DPO',
      'ViT',
      'OpenCV',
      'Albumentations',
      'HuggingFace TRL',
      'W&B',
    ],
    githubUrl: 'https://github.com/Sanju562586/Identity-Document-Intelligence-System',
    liveUrl: null, // No live deployment available
    demoType: 'vlm-intel',
    architecture: 'Synthetic ID Degradation (5k+ docs) ➔ QLoRA SFT on PaliGemma-3B ➔ DPO Preference Alignment ➔ Dual-Stream ELA Forgery Detection',
    metrics: ['5,000+ Synthetic Docs', '24 Adversarial Conditions', 'Grad-CAM Tamper Maps'],
    highlights: [
      'Generated 5,000+ synthetic ID document images across 8 degradation types using PIL & Albumentations, establishing an adversarial OCR benchmark across Tesseract, EasyOCR, and TrOCR.',
      'Fine-tuned PaliGemma-3B with QLoRA + SFT via HuggingFace TRL for structured field extraction (name, DOB, ID number) from noisy, real-world identity documents.',
      'Built a dual-stream forgery detection head fusing VLM vision encoder features with ELA noise maps, evaluated on AUROC and ECE with Grad-CAM tamper localization.',
      'Applied DPO preference alignment atop the SFT checkpoint to penalize overconfident predictions; benchmarked Base → SFT → SFT+DPO across 24 adversarial test conditions on W&B.'
    ],
    cardStyle: 'card-3',
  },

  // --- 04: AGENTIC NATURAL LANGUAGE DATA ANALYSIS ASSISTANT ---
  {
    id: '04',
    tag: 'AGENTIC DATA AI',
    category: 'AI',
    title: 'Agentic Natural Language Data Analysis Assistant',
    subtitle: 'Zero-Framework Multi-Step CSV Reasoning Loop with Sandboxed Execution',
    description:
      'An end-to-end AI agent enabling natural language querying over arbitrary CSV datasets via a multi-step autonomous reasoning loop implemented from scratch without orchestration frameworks.',
    stack: ['Python', 'Gemini API', 'Pandas', 'Streamlit', 'Seaborn'],
    githubUrl: 'https://github.com/Sanju562586/Data-Analyst-Agent',
    liveUrl: 'https://data-analysis-assistant.streamlit.app', // Live deployed app
    demoType: 'data-agent',
    architecture: 'Natural Language Query ➔ Gemini 1.5 Flash Reasoning Loop ➔ Dynamic Tool Selection ➔ Sandboxed Pandas Execution ➔ Seaborn Chart Synthesis',
    metrics: ['6 Schema Tools', 'Sandboxed Python Exec', 'Zero-Framework Loop'],
    highlights: [
      'Built an end-to-end AI agent enabling natural language querying over arbitrary CSV datasets via a multi-step autonomous reasoning loop — implemented from scratch without any heavy orchestration framework.',
      'Designed 6 registered tool functions with structured JSON schemas consumed by the Gemini Flash API; results are injected back into the LLM context across iterations until a complete analytical response is formed.',
      'Tool capabilities include statistical summarisation, conditional row filtering, group-level aggregation, sandboxed Pandas code execution, and dynamic chart generation.',
      'Deployed as a live Streamlit web application on Streamlit Cloud with API secrets management.'
    ],
    cardStyle: 'card-4',
  },

  // --- 05: SENTINELLM — AI PROMPT INJECTION & SECURITY GATEWAY ---
  {
    id: '05',
    tag: 'AI SECURITY & LLM FIREWALL',
    category: 'AI',
    title: 'SentinelLLM — AI Prompt Injection & Security Gateway',
    subtitle: 'Dual-Stage Defense Intercepting Jailbreaks, Prompt Injections & RAG Poisoning',
    description:
      'An open-source security gateway that intercepts LLM requests and responses in real-time to detect and prevent direct/indirect prompt injection, jailbreaks, and instruction hijacking with sub-second overhead.',
    stack: [
      'Python',
      'FastAPI',
      'PyTorch',
      'Hugging Face Transformers',
      'DeBERTa',
      'Presidio',
      'PostgreSQL',
      'SQLAlchemy',
      'Streamlit',
      'Docker',
    ],
    githubUrl: 'https://github.com/Sanju562586/Prompt-Injection-Firewall',
    liveUrl: null, // No live deployment available
    demoType: 'security-gateway',
    architecture: 'Inbound Request ➔ Rule-Based Scanner + DeBERTa Classifier ➔ Presidio PII Masking ➔ Target LLM ➔ Tool Output / RAG Poisoning Sanitizer ➔ PostgreSQL Audit Log',
    metrics: ['50+ Red-Team Cases', 'Sub-45ms Filter Latency', 'Dual-Stage Inspection'],
    highlights: [
      'Built SentinelLLM, an open-source security gateway that intercepts LLM requests and responses to detect and prevent direct/indirect prompt injection, jailbreaks, and instruction hijacking.',
      'Implemented a dual-stage security pipeline combining fast heuristic rule-based detection with DeBERTa-based deep classification, including dedicated RAG poisoning and tool-output injection detection.',
      'Developed a 50+ case red-team adversarial benchmark, PostgreSQL audit trail system, Streamlit security dashboard, and Dockerized FastAPI gateway enabling continuous regression testing.'
    ],
    cardStyle: 'card-1',
  },

  // --- 06: INTELLIGENT FRAUD DETECTION AND RISK SCORING SYSTEM ---
  {
    id: '06',
    tag: 'DISTRIBUTED ML & STREAMING',
    category: 'Machine Learning',
    title: 'Intelligent Fraud Detection and Risk Scoring System',
    subtitle: 'Scalable Streaming Architecture with Apache Kafka, Spark & 7-State Lifecycle',
    description:
      'A scalable real-time data processing pipeline using Apache Kafka and Spark Structured Streaming with a partition-based load balancer, 3 parallel workers, and a 7-state transaction lifecycle.',
    stack: ['Apache Spark', 'Kafka', 'Hadoop', 'Python', 'Scikit-learn', 'FastAPI'],
    githubUrl: 'https://github.com/Sanju562586/Intelligent-Fraud-Detection',
    liveUrl: null, // No live deployment available
    demoType: 'stream-fraud',
    architecture: 'Kafka Stream Ingestion ➔ Partition Load Balancer ➔ 3 Spark Workers ➔ Random Forest Scoring ➔ 7-State Lifecycle (RECEIVED → QUEUED → PROCESSING → SCORED → FLAGGED/CLEARED → PUBLISHED) ➔ FastAPI REST API',
    metrics: ['7-State Lifecycle', '3 Parallel Workers', 'Kafka Checkpointing'],
    highlights: [
      'Designed and implemented a scalable real-time data processing pipeline using Apache Kafka and Spark Structured Streaming to ingest, process, clean, and transform streaming transaction data.',
      'Built a distributed processing architecture with a partition-based load balancer and 3 parallel workers, enabling horizontal scalability and efficient processing of high-volume transactions.',
      'Developed a Random Forest-based fraud detection and risk scoring solution with feature preprocessing and real-time inference for automated transaction analysis.',
      'Designed a distributed 7-state transaction lifecycle architecture covering RECEIVED → QUEUED → PROCESSING → SCORED → FLAGGED/CLEARED → PUBLISHED, ensuring state validation, timestamps, and end-to-end traceability.',
      'Developed a FastAPI backend exposing REST APIs for transaction monitoring, fraud predictions, worker health, and system metrics.',
      'Improved pipeline reliability and fault tolerance through Kafka offset checkpointing and independently operating worker architecture.'
    ],
    cardStyle: 'card-2',
  },

  // --- 07: AI RESUME Q&A ASSISTANT ---
  {
    id: '07',
    tag: 'RETRIEVAL AUGMENTATION',
    category: 'AI',
    title: 'AI Resume Q&A Assistant',
    subtitle: 'Modular FAISS Vector Search & LLM Interview Synthesis Engine',
    description:
      'A Retrieval-Augmented Generation (RAG) pipeline covering document parsing, chunking, embedding generation, and semantic vector search over a FAISS index with pluggable LLM backends.',
    stack: ['Python', 'LangChain', 'RAG', 'FAISS', 'LLMs'],
    githubUrl: 'https://github.com/Sanju562586/AI-Resume-Q-A-Assistant',
    liveUrl: null, // No live deployment available
    demoType: 'rag-engine',
    architecture: 'Document Parser (PDF/DOCX) ➔ Recursive Text Chunking ➔ Embedding Generation ➔ FAISS Similarity Index ➔ Grounded LLM Response Generator',
    metrics: ['<40ms Vector Search', 'Zero Downstream Coupling', 'Multi-Format Parser'],
    highlights: [
      'Built a Retrieval-Augmented Generation (RAG) pipeline covering document parsing, chunking, embedding generation, and semantic search over a FAISS vector index.',
      'Integrated LLMs to answer natural-language queries against resume content, enabling context-aware responses, skill extraction, and automated interview question generation.',
      'Designed a modular pipeline architecture allowing the embedding model or LLM backend to be swapped with zero downstream changes.'
    ],
    cardStyle: 'card-3',
  },

  // --- 08: GOOGLE AI PERSONAL ASSISTANT ---
  {
    id: '08',
    tag: 'GOOGLE MCP & AGENTIC AI',
    category: 'AI',
    title: 'Google AI Personal Assistant',
    subtitle: 'Autonomous Multi-Tool Agent over Google Services via Model Context Protocol',
    description:
      'An autonomous reasoning agent leveraging Groq’s LLaMA 3.3-70B and Model Context Protocol (MCP) to orchestrate 20+ live tools across Gmail, Drive, Calendar, Photos, Tasks, and Contacts over OAuth 2.0.',
    stack: ['Python', 'Groq (LLaMA 3.3)', 'MCP Protocol', 'Google OAuth 2.0', 'JSON-RPC'],
    githubUrl: 'https://github.com/Sanju562586/GoogleServicesAgent',
    liveUrl: null, // Local OAuth MCP server
    demoType: 'mcp-agent',
    architecture: 'Groq LLaMA 3.3 (70B) ➔ Custom MCP Subprocess ➔ JSON-RPC stdio Channel ➔ Google OAuth 2.0 API Handlers',
    metrics: ['20+ Live MCP Tools', 'Sub-400ms Reasoning', '20-turn Context Memory'],
    highlights: [
      'AI Brain: Groq’s LLaMA 3.3-70B handles high-order reasoning and tool-calling with automatic model fallback on rate limits.',
      'MCP Architecture: A unified Google MCP server runs as a subprocess, exposing 20+ tools across Gmail, Drive, Calendar, Photos, Tasks, and Contacts over a JSON-RPC stdio channel.',
      'Live Google Integration: Full read/write access to Google services via OAuth 2.0; send emails, create calendar events, search Drive files in real time.',
      'Multi-turn Conversation: Maintains rolling chat history (up to 20 turns), auto-injects current IST time for scheduling, and handles malformed tool calls with regex fallback parsing.'
    ],
    cardStyle: 'card-4',
  },

  // --- 09: CAMPUS FOOD REDISTRIBUTION NETWORK ---
  {
    id: '09',
    tag: 'FULL-STACK WEB & REALTIME',
    category: 'Web Development',
    title: 'Campus Food Redistribution Network',
    subtitle: 'Zero-Race-Condition Transaction System with Socket.io & Gemini AI',
    description:
      'A real-time distributed web platform to eliminate campus food waste with role-based access control, zero-race-condition PostgreSQL transactions, and WebSocket broadcasting.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Socket.io', 'Google Gemini AI', 'TypeScript'],
    githubUrl: 'https://github.com/Sanju562586/CampusFoodRedistribution',
    liveUrl: null, // Campus private deployment
    demoType: 'realtime-web',
    architecture: 'Next.js Frontend ➔ Node.js API ➔ PostgreSQL Row-Locking Reservations ➔ Socket.io Real-Time Broadcast ➔ Gemini AI Dietary Matcher',
    metrics: ['0 Race Conditions', 'Instant Broadcasts', 'End-to-End QR Flow'],
    highlights: [
      'Architected a real-time distributed web platform to eliminate food waste across campus with role-based access for Admin, Donor, and Student users.',
      'Designed concurrent reservation system using PostgreSQL transactions with row-level locking — zero race conditions under simultaneous requests.',
      'Built event-driven real-time communication layer using WebSockets (Socket.io) enabling instant food availability broadcasts to all connected clients.',
      'Integrated Google Gemini AI for personalized dietary recommendations; implemented OTP authentication and QR-code pickup verification for secure end-to-end flows.'
    ],
    cardStyle: 'card-1',
  },
];
