import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "../pages/Landing"
import AuditForm from "../pages/AuditForm"
import PublicReport from "../pages/PublicReport"
import Results from "../pages/Results"
import Layout from "../Layout/Layout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout>  <Landing /></Layout>
        } />
        <Route path="/audit" element={
          <Layout>  <AuditForm /></Layout>
        } />
        <Route path="/results" element={
          <Layout>  <Results /></Layout>
        } />
        <Route path="/report/:id" element={
          <Layout>  <PublicReport /></Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App