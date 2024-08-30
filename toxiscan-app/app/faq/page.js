'use client'
import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Container, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  const faqs = [
    {
      question: "What is this app about?",
      answer: "This app helps .",
    },
    {
      question: "How do I create an account?",
      answer: "To create an account .",
    },
    {
      question: "How do I scan iteams ?",
      answer: "You can scan iteams on the search bar.",
    },
    {
        question: "How do I scan iteams ?",
        answer: "You can scan iteams on the search bar.",
      },
   
  ];

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ width: '100%', maxWidth: 600, mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ;
