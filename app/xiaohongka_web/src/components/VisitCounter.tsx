"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, Activity, Heart } from 'lucide-react';

interface VisitData {
  todayCount: number;
  totalCount: number;
  servedPatients: number;
  date: string;
}

export default function VisitCounter() {
  const [visitData, setVisitData] = useState<VisitData>({ todayCount: 0, totalCount: 0, servedPatients: 0, date: '' });
  const [loading, setLoading] = useState(true);
  const [hasCounted, setHasCounted] = useState(false);

  // 检查是否已经计数过（使用sessionStorage）
  useEffect(() => {
    const counted = sessionStorage.getItem('visitCounted');
    setHasCounted(counted === 'true');
  }, []);

  // 获取访问计数
  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const response = await fetch('/api/counter');
        const data = await response.json();
        
        if (data.success) {
          setVisitData({
            todayCount: data.todayCount,
            totalCount: data.totalCount,
            servedPatients: data.servedPatients,
            date: data.date
          });
        }
      } catch (error) {
        console.error('Error fetching visit count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitCount();
  }, []);

  // 记录访问
  useEffect(() => {
    if (!hasCounted && !loading) {
      const recordVisit = async () => {
        try {
          const response = await fetch('/api/counter', {
            method: 'POST',
          });
          const data = await response.json();
          
          if (data.success) {
            setVisitData({
              todayCount: data.todayCount,
              totalCount: data.totalCount,
              servedPatients: data.servedPatients,
              date: data.date
            });
            sessionStorage.setItem('visitCounted', 'true');
            setHasCounted(true);
          }
        } catch (error) {
          console.error('Error recording visit:', error);
        }
      };

      recordVisit();
    }
  }, [hasCounted, loading]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6"
      >
        <div className="flex items-center justify-center h-16">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-4 w-4"></div>
            <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-4 w-4"></div>
            <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-4 w-4"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 rounded-lg shadow-md p-6 mb-6 border border-red-200 dark:border-red-800"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 p-3 rounded-full"
          >
            <Users className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              使用统计
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              小红卡急症处理指引生成器
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-red-500" />
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              {visitData.totalCount.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            累计使用人次
          </div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {visitData.todayCount.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            今日访问量
          </div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="h-5 w-5 text-pink-500" />
            <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
              {visitData.servedPatients.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            服务患者数量
          </div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Calendar className="h-5 w-5 text-green-500" />
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {new Date(visitData.date).toLocaleDateString('zh-CN')}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            统计日期
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, delay: 0.5 }}
        className="h-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"
      />
      
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-500 text-center">
        感谢您的使用，每一次访问都是对我们工作的肯定 ❤️
      </div>
    </motion.div>
  );
}