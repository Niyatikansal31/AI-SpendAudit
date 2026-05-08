# Architecture

## Stack Choice

The project uses React + TypeScript on the frontend and Node.js + Express on the backend.

MongoDB is used for storing reports and captured leads because the data structure is flexible and document-oriented.

## Audit Engine Design

The audit engine is implemented as a rule-based utility.

The current MVP uses deterministic logic instead of AI-generated financial recommendations because rule-based recommendations are easier to validate, debug, and explain.

## Data Flow

1. User submits AI tooling information
2. Backend audit engine processes spending data
3. Recommendations and savings are generated
4. Report is stored in MongoDB
5. Frontend displays results
6. Public report URL can later fetch the saved report

## System Diagram

```mermaid
flowchart TD
    A[Frontend Audit Form] --> B[Express API]
    B --> C[Audit Engine]
    C --> D[Summary Generator]
    D --> E[MongoDB]
    E --> F[Results Page]