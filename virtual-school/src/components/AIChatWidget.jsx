import React, { useState } from 'react';
import { MessageCircle, X, Send, BookOpen, GraduationCap, Calendar, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Assalam-o-Alaikum! Welcome to Al Qalam International Cambridge School. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = [
    { icon: BookOpen, text: 'Admission Process' },
    { icon: GraduationCap, text: 'Course Details' },
    { icon: Calendar, text: 'Fee Structure' },
    { icon: HelpCircle, text: 'Contact Info' },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: getBotResponse(inputValue)
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('admission') || lowerQuery.includes('apply')) {
      return 'For admissions, please visit our Admissions page or fill out the online application form. We offer rolling admissions for Cambridge programs (O/A Levels). Our team will contact you within 24 hours.';
    } else if (lowerQuery.includes('fee') || lowerQuery.includes('cost')) {
      return 'Our fee structure varies by grade level. Please visit the Admissions section or contact our office at +92-XXX-XXXXXXX for detailed fee information. We also offer sibling discounts.';
    } else if (lowerQuery.includes('course') || lowerQuery.includes('subject')) {
      return 'We offer complete Cambridge curriculum including O Levels and A Levels with subjects like Mathematics, Physics, Chemistry, Biology, Computer Science, Business Studies, and more.';
    } else if (lowerQuery.includes('contact') || lowerQuery.includes('phone') || lowerQuery.includes('email')) {
      return 'You can reach us at info@alqalamschool.edu.pk or call us at +92-XXX-XXXXXXX. Our office hours are Monday-Saturday, 8:00 AM - 4:00 PM.';
    } else {
      return 'Thank you for your inquiry. For specific questions, please visit the relevant section of our website or contact our administration office directly.';
    }
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-primary-500/50 transition-shadow duration-300"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] glass rounded-2xl shadow-2xl border border-primary-500/30 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <p className="text-xs text-white/80">Al Qalam School</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                        : 'bg-white/10 text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(item.text)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-white/5 hover:bg-primary-500/20 rounded-full text-xs text-gray-300 hover:text-primary-400 transition-all duration-300"
                  >
                    <item.icon className="w-3 h-3" />
                    <span>{item.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                />
                <button
                  type="submit"
                  className="p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
