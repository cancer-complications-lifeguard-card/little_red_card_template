"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Download, Share2, Github, Globe, Mail } from "lucide-react";
import GuideGenerator from "@/components/red-card/GuideGenerator";
import AIAssistant from "@/components/red-card/AIAssistant";
import UnifiedStats from "@/components/UnifiedStats";

export default function Home() {
  const [activeTab, setActiveTab] = useState("guide");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950">
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 max-w-4xl lg:max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Heart className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-red-500" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              小红卡
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
            并发症管理指引生成器
          </p>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
            <Badge variant="secondary" className="text-xs sm:text-sm hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer">
              医疗急救
            </Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer">
              智能指引
            </Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer">
              AI助手
            </Badge>
          </div>
        </motion.div>

        {/* Unified Stats */}
        <UnifiedStats />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 md:mb-8 h-12 sm:h-auto">
              <TabsTrigger 
                value="guide" 
                className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-3"
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">指引生成</span>
                <span className="sm:hidden">指引</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-3"
              >
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">AI助手</span>
                <span className="sm:hidden">AI</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="guide" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-red-200 dark:border-red-800 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                      <Heart className="h-5 w-5" />
                      指引生成器
                    </CardTitle>
                    <CardDescription>
                      通过简单步骤生成个性化的并发症管理指引卡片
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GuideGenerator />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <MessageSquare className="h-5 w-5" />
                      AI医疗助手
                    </CardTitle>
                    <CardDescription>
                      智能问答，为您提供专业的医疗建议和指导
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AIAssistant />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed px-2">
            © 2024 小红卡 - 为您的健康保驾护航，由小红卡开源社区 x 小x宝社区联合提供公益服务
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              onClick={() => window.open('https://github.com/cancer-complications-lifeguard-card', '_blank')}
            >
              <Github className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>GitHub</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              onClick={() => window.open('https://www.xiaohongka.com.cn', '_blank')}
            >
              <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>官网</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              onClick={() => window.location.href = 'mailto:service@xiaoyibao.com.cn'}
            >
              <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>邮箱</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}