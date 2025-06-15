"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

export default function PEChatbot() {
  const { slug } = useParams();
  const [step, setStep] = useState("language");
  const [language, setLanguage] = useState("");
  const [answers, setAnswers] = useState({
    duration: "",
    frequency: "",
    onset: "",
    situations: "",
    anxiety: "",
    medications: "",
    health: "",
    lifestyle: "",
    activity: "",
    impact: "",
    previousTreatment: "",
    preferredHelp: "",
    doctorConsult: "",
  });

  useEffect(() => {
    if (slug) {
      const selectedLanguage = Array.isArray(slug) ? slug[0] : slug;
      setLanguage(selectedLanguage);
      if (selectedLanguage && step === "language") {
        setStep("duration");
      }
    }
  }, [slug, step]);

  const handleAnswer = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });

    // Define the correct step progression
    const nextSteps = {
      duration: "frequency",
      frequency: "onset",
      onset: "situations",
      situations: "anxiety",
      anxiety: "medications",
      medications: "health",
      health: "lifestyle",
      lifestyle: "activity",
      activity: "impact",
      impact: "previousTreatment",
      previousTreatment: "preferredHelp",
      preferredHelp: "doctorConsult",
      doctorConsult: "recommendation",
    };

    if (nextSteps[question]) {
      setStep(nextSteps[question]);
    }
  };

  const resetChat = () => {
    setStep("language");
    setLanguage("");
    setAnswers({
      duration: "",
      frequency: "",
      onset: "",
      situations: "",
      anxiety: "",
      medications: "",
      health: "",
      lifestyle: "",
      activity: "",
      impact: "",
      previousTreatment: "",
      preferredHelp: "",
      doctorConsult: "",
    });
  };

  // Question components for English and Hindi
  const questions = {
    english: {
      duration: {
        question: "How long have you been experiencing premature ejaculation?",
        options: ["Less than a month", "1–6 months", "More than 6 months"],
      },
      frequency: {
        question: "How often do you ejaculate sooner than you'd like?",
        options: ["Always", "Often", "Sometimes", "Rarely"],
      },
      onset: {
        question: "Did this issue begin recently or has it always been there?",
        options: ["Since I became sexually active", "It started recently"],
      },
      situations: {
        question: "Does this happen in all sexual activities or just some?",
        options: [
          "All types of sexual activity",
          "Only in specific situations",
        ],
      },
      anxiety: {
        question: "Do you feel anxious, nervous, or stressed during sex?",
        options: ["Yes", "No", "Sometimes"],
      },
      medications: {
        question: "Are you currently taking any medications?",
        options: ["Yes", "No"],
      },
      health: {
        question: "Do you have any of the following health conditions?",
        options: ["Diabetes", "Hypertension", "Heart Disease", "None of these"],
      },
      lifestyle: {
        question: "How often do you drink alcohol or smoke?",
        options: ["Daily", "Occasionally", "Never"],
      },
      activity: {
        question: "How would you rate your physical activity level?",
        options: ["Very Active", "Moderately Active", "Not Active"],
      },
      impact: {
        question: "Has this issue affected your confidence or relationship?",
        options: ["Yes", "No", "A little bit"],
      },
      previousTreatment: {
        question: "Have you tried any remedies or treatments before?",
        options: ["Yes", "No"],
      },
      preferredHelp: {
        question: "What kind of help are you looking for?",
        options: [
          "Natural remedies (like Ayurveda, Unani)",
          "Medical treatment",
          "A combination of both",
        ],
      },
      doctorConsult: {
        question:
          "Would you like to speak with a certified doctor for a personalized plan?",
        options: ["Yes", "No", "Maybe later"],
      },
    },
    hindi: {
      duration: {
        question: "आपको शीघ्रपतन की समस्या कब से हो रही है?",
        options: ["एक महीने से कम", "1–6 महीने", "6 महीने से ज़्यादा"],
      },
      frequency: {
        question:
          "क्या आप अक्सर संभोग के दौरान अपनी इच्छा से पहले स्खलित हो जाते हैं?",
        options: ["हमेशा", "अक्सर", "कभी-कभी", "बहुत कम"],
      },
      onset: {
        question: "क्या यह समस्या हाल ही में शुरू हुई है या पहले से है?",
        options: [
          "जब से मैंने यौन गतिविधियाँ शुरू की हैं",
          "यह हाल ही में शुरू हुई है",
        ],
      },
      situations: {
        question:
          "क्या यह समस्या हर यौन गतिविधि में होती है या कुछ खास स्थितियों में?",
        options: ["हर स्थिति में", "सिर्फ कुछ खास स्थितियों में"],
      },
      anxiety: {
        question: "क्या सेक्स के दौरान आपको चिंता या तनाव महसूस होता है?",
        options: ["हाँ", "नहीं", "कभी-कभी"],
      },
      medications: {
        question: "क्या आप इस समय कोई दवा ले रहे हैं?",
        options: ["हाँ", "नहीं"],
      },
      health: {
        question: "क्या आपको इनमें से कोई बीमारी है?",
        options: ["मधुमेह", "उच्च रक्तचाप", "हृदय रोग", "इनमें से कोई नहीं"],
      },
      lifestyle: {
        question: "आप शराब या सिगरेट का सेवन कितनी बार करते हैं?",
        options: ["रोज़ाना", "कभी-कभार", "कभी नहीं"],
      },
      activity: {
        question: "आपकी शारीरिक गतिविधि का स्तर कैसा है?",
        options: ["बहुत सक्रिय", "औसत", "कम सक्रिय"],
      },
      impact: {
        question:
          "क्या इस समस्या से आपके आत्मविश्वास या रिश्तों पर असर पड़ा है?",
        options: ["हाँ", "नहीं", "थोड़ा बहुत"],
      },
      previousTreatment: {
        question: "क्या आपने पहले कोई इलाज या उपाय किया है?",
        options: ["हाँ", "नहीं"],
      },
      preferredHelp: {
        question: "आप किस प्रकार की मदद चाहते हैं?",
        options: [
          "प्राकृतिक उपचार (जैसे आयुर्वेद, यूनानी)",
          "मेडिकल उपचार",
          "दोनों का मिश्रण",
        ],
      },
      doctorConsult: {
        question: "क्या आप किसी प्रमाणित डॉक्टर से परामर्श लेना चाहेंगे?",
        options: ["हाँ", "नहीं", "बाद में सोचेंगे"],
      },
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.03,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  // Progress indicator based on step
  const getProgressPercentage = () => {
    const allSteps = [
      "duration",
      "frequency",
      "onset",
      "situations",
      "anxiety",
      "medications",
      "health",
      "lifestyle",
      "activity",
      "impact",
      "previousTreatment",
      "preferredHelp",
      "doctorConsult",
      "recommendation",
    ];
    const currentIndex = allSteps.indexOf(step);
    return (currentIndex / (allSteps.length - 1)) * 100;
  };

  // Generate recommendation based on answers
  const generateRecommendation = () => {
    const hasChronicSymptoms =
      answers.duration?.includes("6 months") ||
      answers.duration?.includes("6 महीने");
    const frequentIssue =
      answers.frequency === "Always" ||
      answers.frequency === "Often" ||
      answers.frequency === "हमेशा" ||
      answers.frequency === "अक्सर";
    const highAnxiety = answers.anxiety === "Yes" || answers.anxiety === "हाँ";
    const poorLifestyle =
      answers.lifestyle === "Daily" || answers.lifestyle === "रोज़ाना";
    const inactive =
      answers.activity === "Not Active" || answers.activity === "कम सक्रिय";
    const significantImpact =
      answers.impact === "Yes" || answers.impact === "हाँ";
    const hasHealthConditions =
      answers.health !== "None of these" &&
      answers.health !== "इनमें से कोई नहीं";

    if (
      hasChronicSymptoms ||
      frequentIssue ||
      highAnxiety ||
      poorLifestyle ||
      inactive ||
      significantImpact ||
      hasHealthConditions
    ) {
      return "doctor";
    } else {
      return "supplement";
    }
  };

  // Render the current question
  const renderQuestion = () => {
    if (step === "recommendation") {
      const recommendation = generateRecommendation();

      return (
        <motion.div
          className="p-8 rounded-2xl shadow-lg bg-white border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold mb-4 text-center text-gray-800"
          >
            {language === "english" ? "Your Recommendation" : "आपका सुझाव"}
          </motion.h2>

          {language === "english" ? (
            <div>
              <motion.p
                variants={itemVariants}
                className="mb-4 text-gray-600 text-center"
              >
                Thanks for sharing that with us! Based on your responses, we
                recommend:
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-6 border border-green-100"
              >
                {recommendation === "supplement" ? (
                  <>
                    <p className="font-bold text-green-800 flex items-center">
                      <span className="text-xl mr-2">🟢</span> Natural Low T
                      Booster Kit
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
                      <span className="text-xl mr-2">👨‍⚕️</span> Doctor
                      Consultation Recommended
                    </p>
                    <ul className="list-disc pl-8 mt-3 space-y-1 text-gray-700">
                      <li>Professional medical assessment</li>
                      <li>Personalized treatment plan</li>
                      <li>Address underlying health concerns</li>
                    </ul>
                  </>
                )}
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="font-medium mb-4 text-center text-gray-700"
              >
                Would you like to proceed or explore other options?
              </motion.p>

              <div className="space-y-3">
                <motion.button
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() =>
                    window.open(
                      "https://sexuloon.com/products/low-t-booster-pack",
                      "_blank"
                    )
                  }
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-md hover:from-green-600 hover:to-green-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">🛒</span>{" "}
                  {recommendation === "supplement"
                    ? "View Product"
                    : "Alternative: Natural Supplements"}
                </motion.button>

                <motion.button
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() =>
                    window.open("https://sexuloon.com/consult", "_blank")
                  }
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">👨‍⚕️</span>{" "}
                  {recommendation === "doctor"
                    ? "Book Consultation"
                    : "Consult Doctor Instead"}
                </motion.button>
              </div>
            </div>
          ) : (
            <div>
              <motion.p
                variants={itemVariants}
                className="mb-4 text-gray-600 text-center"
              >
                आपकी जानकारी के आधार पर, हम आपको यह सुझाव देते हैं:
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-6 border border-green-100"
              >
                {recommendation === "supplement" ? (
                  <>
                    <p className="font-bold text-green-800 flex items-center">
                      <span className="text-xl mr-2">🟢</span> प्राकृतिक Low T
                      Booster Kit
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
                      <span className="text-xl mr-2">👨‍⚕️</span> डॉक्टर से परामर्श
                      अनुशंसित
                    </p>
                    <ul className="list-disc pl-8 mt-3 space-y-1 text-gray-700">
                      <li>पेशेवर चिकित्सा मूल्यांकन</li>
                      <li>व्यक्तिगत उपचार योजना</li>
                      <li>मूल स्वास्थ्य चिंताओं का समाधान</li>
                    </ul>
                  </>
                )}
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="font-medium mb-4 text-center text-gray-700"
              >
                क्या आप आगे बढ़ना चाहते हैं या अन्य विकल्प देखना चाहते हैं?
              </motion.p>

              <div className="space-y-3">
                <motion.button
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() =>
                    window.open(
                      "https://sexuloon.com/products/low-t-booster-pack",
                      "_blank"
                    )
                  }
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-md hover:from-green-600 hover:to-green-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">🛒</span>{" "}
                  {recommendation === "supplement"
                    ? "उत्पाद देखें"
                    : "विकल्प: प्राकृतिक सप्लीमेंट"}
                </motion.button>

                <motion.button
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() =>
                    window.open("https://sexuloon.com/consult", "_blank")
                  }
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">👨‍⚕️</span>{" "}
                  {recommendation === "doctor"
                    ? "परामर्श बुक करें"
                    : "डॉक्टर से बात करें"}
                </motion.button>
              </div>
            </div>
          )}

          <motion.div variants={itemVariants} className="mt-8 text-center">
            <button
              onClick={resetChat}
              className="text-sm text-gray-500 hover:text-gray-700 underline transition"
            >
              {language === "english" ? "Start Over" : "फिर से शुरू करें"}
            </button>
          </motion.div>
        </motion.div>
      );
    } else {
      const currentLang = language === "english" ? "english" : "hindi";
      const currentQuestion = questions[currentLang][step];

      if (!currentQuestion) {
        return (
          <div className="p-8 text-center">
            <p>Question not found for step: {step}</p>
            <button
              onClick={resetChat}
              className="mt-4 text-blue-500 underline"
            >
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
              {language === "english" ? "Start Over" : "फिर से शुरू करें"}
            </button>
          </motion.div>
        </motion.div>
      );
    }
  };

  // Calculate which step number we're on
  const getCurrentStepNumber = () => {
    const allSteps = [
      "language",
      "duration",
      "frequency",
      "onset",
      "situations",
      "anxiety",
      "medications",
      "health",
      "lifestyle",
      "activity",
      "impact",
      "previousTreatment",
      "preferredHelp",
      "doctorConsult",
      "recommendation",
    ];
    return allSteps.indexOf(step);
  };

  const totalSteps = 14; // Total number of steps including language and recommendation

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
            {language === "hindi" ? "स्वास्थ्य परामर्श" : "Health Consultation"}
          </h1>
          <p className="text-gray-600">
            {language === "hindi"
              ? "आपकी गोपनीयता हमारी प्राथमिकता है"
              : "Your privacy is our priority"}
          </p>
        </motion.div>

        {/* Progress bar */}
        {step !== "language" && step !== "recommendation" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>
                Step {getCurrentStepNumber()}/{totalSteps - 2}
              </span>
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
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            {language === "hindi"
              ? "आपका डेटा सुरक्षित है और गोपनीय रखा जाएगा"
              : "Your data is secure and will be kept confidential"}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
