import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

function ERDiagram() {
  const diagramRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "base",
      themeVariables: {
        primaryColor: "#e3f2fd",
        primaryBorderColor: "#90caf9",
        primaryTextColor: "#000",
        lineColor: "#90a4ae",
        background: "#ffffff",
      },
      flowchart: {
        curve: "basis",
      },
    });

    mermaid.contentLoaded();
  }, []);

  const diagram = `
    erDiagram

    MEMBER {
        int member_id PK
        string name
        string email
        string password
        string role
        string library_id
        datetime created_at
    }

    LIBRARIAN {
        int librarian_id PK
        string name
        string email
        string password
    }

    BOOK {
        int book_id PK
        string title
        string author
        string subject
        string isbn
        string status
        int total_copies
        int available_copies
    }

    BORROW {
        int borrow_id PK
        int member_id FK
        int book_id FK
        date issue_date
        date due_date
        date return_date
        double fine_amount
        string status
    }

    NOTIFICATION {
        int notification_id PK
        int member_id FK
        string message
        date sent_date
        string status
    }

    INVENTORY_LOG {
        int log_id PK
        int librarian_id FK
        int book_id FK
        string action
        date action_date
    }

    MEMBER ||--o{ BORROW : borrows
    BOOK ||--o{ BORROW : contains
    MEMBER ||--o{ NOTIFICATION : receives
    LIBRARIAN ||--o{ INVENTORY_LOG : manages
    BOOK ||--o{ INVENTORY_LOG : logged
  `;

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">
        📘 Library Management System - ER Diagram
      </h2>
      <div
        className="mermaid"
        ref={diagramRef}
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {diagram}
      </div>
    </div>
  );
}

export default ERDiagram;
