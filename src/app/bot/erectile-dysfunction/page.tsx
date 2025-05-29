'use client'

import React,{ useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function EDChatbot() {
  const [step, setStep] = useState('language');
  const [language, setLanguage] = useState('');
  const [answers, setAnswers] = useState({
    age: '',
    duration: '',
    frequency: '',
    morningErections: '',
    lifestyle: '',
    stress: '',
    healthConditions: ''
  });

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setStep('age');
  };

  const handleAnswer = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
    
    // Move to next step
    switch(question) {
      case 'age': setStep('duration'); break;
      case 'duration': setStep('frequency'); break;
      case 'frequency': setStep('morningErections'); break;
      case 'morningErections': setStep('lifestyle'); break;
      case 'lifestyle': setStep('stress'); break;
      case 'stress': setStep('healthConditions'); break;
      case 'healthConditions': setStep('recommendation'); break;
      default: break;
    }
  };

  const resetChat = () => {
    setStep('language');
    setLanguage('');
    setAnswers({
      age: '',
      duration: '',
      frequency: '',
      morningErections: '',
      lifestyle: '',
      stress: '',
      healthConditions: ''
    });
  };

  // Question components for English and Hindi
  const questions = {
    english: {
      age: {
        question: "How old are you?",
        options: ["Below 25", "25 - 35", "36 - 45", "46 and above"]
      },
      duration: {
        question: "How long have you been facing erectile difficulties?",
        options: ["Just recently", "A few weeks", "1-3 months", "More than 3 months"]
      },
      frequency: {
        question: "How often do you experience erectile dysfunction?",
        options: ["Occasionally", "Often", "Every time"]
      },
      morningErections: {
        question: "Do you still get morning erections?",
        options: ["Yes, regularly", "Sometimes", "Never"]
      },
      lifestyle: {
        question: "Do you consume alcohol or smoke regularly?",
        options: ["Yes, both", "Only alcohol", "Only smoking", "No, none"]
      },
      stress: {
        question: "How would you rate your stress levels?",
        options: ["High", "Moderate", "Low"]
      },
      healthConditions: {
        question: "Do you suffer from any of the following?",
        options: ["Diabetes", "High blood pressure", "Heart issues", "None of these"]
      }
    },
    hindi: {
      age: {
        question: "आपकी उम्र क्या है?",
        options: ["25 से कम", "25 - 35", "36 - 45", "46 से अधिक"]
      },
      duration: {
        question: "आपको यह समस्या कितने समय से है?",
        options: ["हाल ही में", "कुछ हफ्तों से", "1-3 महीने", "3 महीने से अधिक"]
      },
      frequency: {
        question: "आपको यह समस्या कितनी बार होती है?",
        options: ["कभी-कभी", "अक्सर", "हर बार"]
      },
      morningErections: {
        question: "क्या आपको सुबह इरेक्शन होते हैं?",
        options: ["हां, नियमित रूप से", "कभी-कभी", "कभी नहीं"]
      },
      lifestyle: {
        question: "क्या आप नियमित रूप से शराब या सिगरेट का सेवन करते हैं?",
        options: ["दोनों", "केवल शराब", "केवल सिगरेट", "नहीं"]
      },
      stress: {
        question: "आपका तनाव स्तर कैसा है?",
        options: ["अधिक", "मध्यम", "कम"]
      },
      healthConditions: {
        question: "क्या आपको इनमें से कोई बीमारी है?",
        options: ["डायबिटीज", "ब्लड प्रेशर", "हार्ट की बीमारी", "इनमें से कोई नहीं"]
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
    const steps = ['language', 'age', 'duration', 'frequency', 'morningErections', 'lifestyle', 'stress', 'healthConditions', 'recommendation'];
    const currentIndex = steps.indexOf(step);
    return (currentIndex / (steps.length - 1)) * 100;
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
            Let&aspos;s get started with a few quick questions to understand your concern better.
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
                <p className="font-bold text-green-800 flex items-center">
                  <span className="text-xl mr-2">🟢</span> Natural Ayurvedic Supplement for ED
                </p>
                <ul className="list-disc pl-8 mt-3 space-y-1 text-gray-700">
                  <li>Improves blood flow and stamina</li>
                  <li>Doctor recommended</li>
                  <li>100% natural ingredients</li>
                </ul>
              </motion.div>
              
              <motion.p variants={itemVariants} className="font-medium mb-4 text-center text-gray-700">
                Would you like to order now or consult with a doctor?
              </motion.p>
              
              <div className="space-y-3">
                <motion.button 
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-md hover:from-green-600 hover:to-green-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">👉</span> Yes, show me the product
                </motion.button>
                
                <motion.button 
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">👉</span> I&apos;d like to consult a doctor
                </motion.button>
              </div>
            </div>
          ) : (
            <div>
              <motion.p variants={itemVariants} className="mb-4 text-gray-600 text-center">
                आपकी जानकारी के आधार पर, हम आपको यह उत्पाद सुझाव देते हैं:
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-6 border border-green-100"
              >
                <p className="font-bold text-green-800 flex items-center">
                  <span className="text-xl mr-2">🟢</span> प्राकृतिक आयुर्वेदिक सप्लीमेंट (ED के लिए)
                </p>
                <ul className="list-disc pl-8 mt-3 space-y-1 text-gray-700">
                  <li>रक्त प्रवाह और स्टैमिना को बेहतर बनाता है</li>
                  <li>डॉक्टर द्वारा अनुशंसित</li>
                  <li>100% प्राकृतिक सामग्री</li>
                </ul>
              </motion.div>
              
              <motion.p variants={itemVariants} className="font-medium mb-4 text-center text-gray-700">
                क्या आप इसे अभी ऑर्डर करना चाहेंगे या डॉक्टर से परामर्श लेना चाहेंगे?
              </motion.p>
              
              <div className="space-y-3">
                <motion.button 
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-md hover:from-green-600 hover:to-green-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">👉</span> हां, उत्पाद दिखाएं
                </motion.button>
                
                <motion.button 
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">👉</span> डॉक्टर से बात करना चाहता हूँ
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
    const steps = ['language', 'age', 'duration', 'frequency', 'morningErections', 'lifestyle', 'stress', 'healthConditions', 'recommendation'];
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
              <span>Step {getCurrentStepNumber() - 1}/8</span>
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