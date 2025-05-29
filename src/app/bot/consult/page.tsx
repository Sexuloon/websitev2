"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
  const [language, setLanguage] = useState("");
  const [condition, setCondition] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    if (language && condition) {
      router.push(`/${language}/${condition}`);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // return (
  //   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //     <motion.div
  //       initial="hidden"
  //       animate="visible"
  //       variants={fadeIn}
  //       className="w-full max-w-md"
  //     >
  //       <Card className="shadow-lg">
  //         <CardHeader className="text-center">
  //           <CardTitle className="text-2xl font-bold">
  //             Health Consultation
  //           </CardTitle>
  //           <CardDescription>
  //             Select your language and condition
  //           </CardDescription>
  //         </CardHeader>
  //         <CardContent className="space-y-6">
  //           <motion.div variants={slideUp}>
  //             <label className="block text-sm font-medium mb-2">
  //               Select Language
  //             </label>
  //             <Select value={language} onValueChange={setLanguage}>
  //               <SelectTrigger>
  //                 <SelectValue placeholder="Choose your language" />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="english">English</SelectItem>
  //                 <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </motion.div>

  //           {language && (
  //             <motion.div initial="hidden" animate="visible" variants={slideUp}>
  //               <label className="block text-sm font-medium mb-2">
  //                 Select Condition
  //               </label>
  //               <Select value={condition} onValueChange={setCondition}>
  //                 <SelectTrigger>
  //                   <SelectValue
  //                     placeholder={
  //                       language === "hindi"
  //                         ? "अपनी स्थिति चुनें"
  //                         : "Choose your condition"
  //                     }
  //                   />
  //                 </SelectTrigger>
  //                 <SelectContent>
  //                   <SelectItem value="premature-ejaculation">
  //                     {language === "hindi"
  //                       ? "शीघ्रपतन"
  //                       : "Premature Ejaculation"}
  //                   </SelectItem>
  //                   <SelectItem value="erectile-dysfunction">
  //                     {language === "hindi"
  //                       ? "नपुंसकता"
  //                       : "Erectile Dysfunction"}
  //                   </SelectItem>
  //                   <SelectItem value="low-testosterone">
  //                     {language === "hindi"
  //                       ? "कम टेस्टोस्टेरोन"
  //                       : "Low Testosterone"}
  //                   </SelectItem>
  //                 </SelectContent>
  //               </Select>
  //             </motion.div>
  //           )}
  //         </CardContent>
  //         <CardFooter>
  //           <motion.div
  //             className="w-full"
  //             initial={{ opacity: 0, scale: 0.9 }}
  //             animate={{
  //               opacity: language && condition ? 1 : 0.5,
  //               scale: 1,
  //               transition: { duration: 0.3 },
  //             }}
  //           >
  //             <Button
  //               className="w-full"
  //               onClick={handleSubmit}
  //               disabled={!language || !condition}
  //             >
  //               {language === "hindi" ? "जारी रखें" : "Continue"}
  //             </Button>
  //           </motion.div>
  //         </CardFooter>
  //       </Card>
  //     </motion.div>
  //   </div>
  // );
   return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Health Consultation
            </CardTitle>
            <CardDescription>
              Select your language and condition
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div variants={slideUp}>
              <label className="block text-sm font-medium mb-2">
                Select Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {language && (
              <motion.div initial="hidden" animate="visible" variants={slideUp}>
                <label className="block text-sm font-medium mb-2">
                  Select Condition
                </label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        language === "hindi"
                          ? "अपनी स्थिति चुनें"
                          : "Choose your condition"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premature-ejaculation">
                      {language === "hindi"
                        ? "शीघ्रपतन"
                        : "Premature Ejaculation"}
                    </SelectItem>
                    <SelectItem value="erectile-dysfunction">
                      {language === "hindi"
                        ? "नपुंसकता"
                        : "Erectile Dysfunction"}
                    </SelectItem>
                    <SelectItem value="low-testosterone">
                      {language === "hindi"
                        ? "कम टेस्टोस्टेरोन"
                        : "Low Testosterone"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </CardContent>

          <CardFooter>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: language && condition ? 1 : 0.5,
                scale: 1,
                transition: { duration: 0.3 },
              }}
            >
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={!language || !condition}
              >
                {language === "hindi" ? "जारी रखें" : "Continue"}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default Page;
