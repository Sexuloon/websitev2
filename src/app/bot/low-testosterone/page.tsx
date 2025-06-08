'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LTChatbot() {
  const [step, setStep] = useState('language');
  const [language, setLanguage] = useState('');
  const [answers, setAnswers] = useState({
    age: '',
    symptoms: [],
    duration: '',
    medications: '',
    lifestyle: '',
    exercise: '',
    sleep: ''
  });

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setStep('symptoms');
  };

  const handleAnswer = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
    
    // Move to next step
    switch(question) {
      case 'symptoms': setStep('duration'); break;
      case 'duration': setStep('age'); break;
      case 'age': setStep('medications'); break;
      case 'medications': setStep('lifestyle'); break;
      case 'lifestyle': setStep('exercise'); break;
      case 'exercise': setStep('sleep'); break;
      case 'sleep': setStep('preference'); break;
      case 'preference': setStep('recommendation'); break;
      default: break;
    }
  };

  const resetChat = () => {
    setStep('language');
    setLanguage('');
    setAnswers({
      age: '',
      symptoms: [],
      duration: '',
      medications: '',
      lifestyle: '',
      exercise: '',
      sleep: ''
    });
  };

  // Question components for English and Hindi
  const questions = {
    english: {
      symptoms: {
        question: "What symptoms are you experiencing? (Select one that applies most)",
        options: [
          "Low energy",
          "Reduced muscle mass",
          "Low sex drive",
          "Difficulty concentrating",
          "Mood swings or depression",
          "Erectile issues"
        ]
      },
      duration: {
        question: "How long have you been experiencing these symptoms?",
        options: [
          "Less than 1 month",
          "1–3 months",
          "3–6 months",
          "More than 6 months"
        ]
      },
      age: {
        question: "What is your age group?",
        options: ["Under 25", "25–34", "35–44", "45–54", "55+"]
      },
      medications: {
        question: "Are you currently taking any supplements or medications?",
        options: ["Yes", "No"]
      },
      lifestyle: {
        question: "Do you smoke or consume alcohol?",
        options: ["Yes", "No", "Occasionally"]
      },
      exercise: {
        question: "How often do you exercise?",
        options: [
          "Daily",
          "3–5 times a week",
          "1–2 times a week",
          "Rarely or never"
        ]
      },
      sleep: {
        question: "How's your sleep quality?",
        options: [
          "Excellent (7–8 hours)",
          "Average (5–6 hours)",
          "Poor (Less than 5 hours)"
        ]
      },
      preference: {
        question: "Would you like to start with a doctor consultation or try natural supplements?",
        options: [
          "Show me natural supplement options",
          "I want to talk to a doctor first"
        ]
      }
    },
    hindi: {
      symptoms: {
        question: "आप किन लक्षणों का अनुभव कर रहे हैं? (सबसे उपयुक्त एक चुनें)",
        options: [
          "कम ऊर्जा",
          "मांसपेशियों में कमी",
          "यौन इच्छा में कमी",
          "ध्यान केंद्रित करने में कठिनाई",
          "मूड स्विंग / डिप्रेशन",
          "इरेक्शन में दिक्कत"
        ]
      },
      duration: {
        question: "ये लक्षण आपको कब से हैं?",
        options: ["1 महीने से कम", "1–3 महीने", "3–6 महीने", "6 महीने से अधिक"]
      },
      age: {
        question: "आपकी उम्र क्या है?",
        options: ["25 से कम", "25–34", "35–44", "45–54", "55+"]
      },
      medications: {
        question: "क्या आप कोई दवा या सप्लीमेंट ले रहे हैं?",
        options: ["हाँ", "नहीं"]
      },
      lifestyle: {
        question: "क्या आप शराब पीते हैं या धूम्रपान करते हैं?",
        options: ["हाँ", "नहीं", "कभी-कभी"]
      },
      exercise: {
        question: "आप कितनी बार व्यायाम करते हैं?",
        options: [
          "रोज़",
          "सप्ताह में 3–5 बार",
          "सप्ताह में 1–2 बार",
          "शायद ही कभी"
        ]
      },
      sleep: {
        question: "आपकी नींद कैसी रहती है?",
        options: [
          "बहुत अच्छी (7–8 घंटे)",
          "औसत (5–6 घंटे)",
          "बहुत खराब (5 घंटे से कम)"
        ]
      },
      preference: {
        question: "आप क्या करना चाहेंगे?",
        options: [
          "प्राकृतिक सप्लीमेंट देखना चाहता हूँ",
          "पहले डॉक्टर से परामर्श करना चाहता हूँ"
        ]
      }
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.03,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  // Progress indicator based on step
  const getProgressPercentage = () => {
    const steps = ['language', 'symptoms', 'duration', 'age', 'medications', 'lifestyle', 'exercise', 'sleep', 'preference', 'recommendation'];
    const currentIndex = steps.indexOf(step);
    return (currentIndex / (steps.length - 1)) * 100;
  };

  // Generate recommendation based on answers
  const generateRecommendation = () => {
    const age = parseInt(answers.age?.split('–')[0] || '25');
    const hasChronicSymptoms = answers.duration?.includes('6 months') || answers.duration?.includes('6 महीने');
    const poorLifestyle = answers.lifestyle === 'Yes' || answers.lifestyle === 'हाँ' || 
                         answers.exercise?.includes('Rarely') || answers.exercise?.includes('शायद') ||
                         answers.sleep?.includes('Poor') || answers.sleep?.includes('खराब');

    if (age > 45 || hasChronicSymptoms || poorLifestyle) {
      return 'doctor';
    } else {
      return 'supplement';
    }
  };

  // Render the current question
  const renderQuestion = () => {
    if (step === 'language') {
      return (
        <motion.div 
          className="p-8 rounded-2xl shadow-lg bg-white border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4 text-center text-gray-800">Welcome!</motion.h2>
          <motion.p variants={itemVariants} className="mb-6 text-center text-gray-600">
            Let&apos;s get started with a few quick questions to understand your concern better.
          </motion.p>
          <motion.p variants={itemVariants} className="font-medium mb-4 text-center text-gray-700">
            Please choose your preferred language:
          </motion.p>
          
          <div className="space-y-3">
            <motion.button 
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleLanguageSelect('english')} 
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center"
            >
              <span className="mr-2">👉</span> English
            </motion.button>
            
            <motion.button 
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleLanguageSelect('hindi')} 
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center"
            >
              <span className="mr-2">👉</span> हिन्दी
            </motion.button>
          </div>
        </motion.div>
      );
    } else if (step === 'recommendation') {
      const recommendation = generateRecommendation();
      
      return (
        <motion.div 
          className="p-8 rounded-2xl shadow-lg bg-white border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4 text-center text-gray-800">
            {language === 'english' ? 'Your Recommendation' : 'आपका सुझाव'}
          </motion.h2>
          
          {language === 'english' ? (
            <div>
              <motion.p variants={itemVariants} className="mb-4 text-gray-600 text-center">
                Thanks for sharing that with us! Based on your responses, we recommend:
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-6 border border-green-100"
              >
                {recommendation === 'supplement' ? (
                  <>
                    <p className="font-bold text-green-800 flex items-center">
                      <span className="text-xl mr-2">🟢</span> Natural Low T Booster Kit
                    </p>
                    <ul className="list-disc pl-8 mt-3 space-y-1 text-gray-700">
                      <li>Shilajit, Ashwagandha, Safed Musli, Gokshura</li>
                      <li>Boosts stamina, testosterone, and energy</li>
                      <li>100% natural ingredients</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-blue-800 flex items-center">
                      <span className="text-xl mr-2">👨‍⚕️</span> Doctor Consultation Recommended
                    </p>
                    <ul className="list-disc pl-8 mt-3 space-y-1 text-gray-700">
                      <li>Professional medical assessment</li>
                      <li>Personalized treatment plan</li>
                      <li>Address underlying health concerns</li>
                    </ul>
                  </>
                )}
              </motion.div>
              
              <motion.p variants={itemVariants} className="font-medium mb-4 text-center text-gray-700">
                Would you like to proceed or explore other options?
              </motion.p>
              
              <div className="space-y-3">
                <motion.button 
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => window.open('https://sexuloon.com/products/low-t-booster-pack', '_blank')}
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-md hover:from-green-600 hover:to-green-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">🛒</span> {recommendation === 'supplement' ? 'View Product' : 'Alternative: Natural Supplements'}
                </motion.button>
                
                <motion.button 
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => window.open('https://sexuloon.com/consult', '_blank')}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">👨‍⚕️</span> {recommendation === 'doctor' ? 'Book Consultation' : 'Consult Doctor Instead'}
                </motion.button>
              </div>
            </div>
          ) : (
            <div>
              <motion.p variants={itemVariants} className="mb-4 text-gray-600 text-center">
                आपकी जानकारी के आधार पर, हम आपको यह सुझाव देते हैं:
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-6 border border-green-100"
              >
                {recommendation === 'supplement' ? (
                  <>
                    <p className="font-bold text-green-800 flex items-center">
                      <span className="text-xl mr-2">🟢</span> प्राकृतिक Low T Booster Kit
                    </p>
                    <ul className="list-disc pl-8 mt-3 space-y-1 text-gray-700">
                      <li>शिलाजीत, अश्वगंधा, सफेद मूसली, गोक्षुर</li>
                      <li>शक्ति, टेस्टोस्टेरोन और ऊर्जा बढ़ाता है</li>
                      <li>100% प्राकृतिक सामग्री</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-blue-800 flex items-center">
                      <span className="text-xl mr-2">👨‍⚕️</span> डॉक्टर से परामर्श अनुशंसित
                    </p>
                    <ul className="list-disc pl-8 mt-3 space-y-1 text-gray-700">
                      <li>पेशेवर चिकित्सा मूल्यांकन</li>
                      <li>व्यक्तिगत उपचार योजना</li>
                      <li>मूल स्वास्थ्य चिंताओं का समाधान</li>
                    </ul>
                  </>
                )}
              </motion.div>
              
              <motion.p variants={itemVariants} className="font-medium mb-4 text-center text-gray-700">
                क्या आप आगे बढ़ना चाहते हैं या अन्य विकल्प देखना चाहते हैं?
              </motion.p>
              
              <div className="space-y-3">
                <motion.button 
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => window.open('https://sexuloon.com/products/low-t-booster-pack', '_blank')}
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-md hover:from-green-600 hover:to-green-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">🛒</span> {recommendation === 'supplement' ? 'उत्पाद देखें' : 'विकल्प: प्राकृतिक सप्लीमेंट'}
                </motion.button>
                
                <motion.button 
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => window.open('https://sexuloon.com/consult', '_blank')}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">👨‍⚕️</span> {recommendation === 'doctor' ? 'परामर्श बुक करें' : 'डॉक्टर से बात करें'}
                </motion.button>
              </div>
            </div>
          )}
          
          <motion.div variants={itemVariants} className="mt-8 text-center">
            <button 
              onClick={resetChat} 
              className="text-sm text-gray-500 hover:text-gray-700 underline transition"
            >
              {language === 'english' ? 'Start Over' : 'फिर से शुरू करें'}
            </button>
          </motion.div>
        </motion.div>
      );
    } else {
      const currentLang = language === 'english' ? 'english' : 'hindi';
      const currentQuestion = questions[currentLang][step];
      
      if (!currentQuestion) {
        return (
          <div className="p-8 text-center">
            <p>Question not found for step: {step}</p>
            <button onClick={resetChat} className="mt-4 text-blue-500 underline">
              Start Over
            </button>
          </div>
        );
      }
      
      return (
        <motion.div 
          className="p-8 rounded-2xl shadow-lg bg-white border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <motion.h2 className="text-xl font-bold mb-6 text-center text-gray-800">
              {currentQuestion.question}
            </motion.h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button 
                  key={index}
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleAnswer(step, option)} 
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition flex items-center"
                >
                  <span className="text-xl mr-3">🔹</span> {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <button 
              onClick={resetChat} 
              className="text-sm text-gray-500 hover:text-gray-700 underline transition"
            >
              {language === 'english' ? 'Start Over' : 'फिर से शुरू करें'}
            </button>
          </motion.div>
        </motion.div>
      );
    }
  };

  // Calculate which step number we're on
  const getCurrentStepNumber = () => {
    const steps = ['language', 'symptoms', 'duration', 'age', 'medications', 'lifestyle', 'exercise', 'sleep', 'preference', 'recommendation'];
    return steps.indexOf(step) + 1;
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {language === 'hindi' ? 'स्वास्थ्य परामर्श' : 'Health Consultation'}
          </h1>
          <p className="text-gray-600">
            {language === 'hindi' ? 'आपकी गोपनीयता हमारी प्राथमिकता है' : 'Your privacy is our priority'}
          </p>
        </motion.div>
        
        {/* Progress bar */}
        {step !== 'language' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Step {Math.max(1, getCurrentStepNumber() - 1)}/9</span>
              <span>{Math.round(getProgressPercentage())}% Complete</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              />
            </div>
          </motion.div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-gray-500 bg-white p-3 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd"></path>
            </svg>
            {language === 'hindi' ? 
              'आपका डेटा सुरक्षित है और गोपनीय रखा जाएगा' : 
              'Your data is secure and will be kept confidential'}
          </div>
        </motion.div>
      </div>
    </div>
  );
}