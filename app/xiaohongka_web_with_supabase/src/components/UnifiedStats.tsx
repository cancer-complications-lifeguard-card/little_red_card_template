"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, Activity, Heart, Wifi } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface VisitData {
  todayCount: number;
  totalCount: number;
  servedPatients: number;
  date: string;
}

export default function UnifiedStats() {
  const [visitData, setVisitData] = useState<VisitData>({ todayCount: 0, totalCount: 0, servedPatients: 0, date: '' });
  const [onlineCount, setOnlineCount] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasCounted, setHasCounted] = useState(false);

  // 检查是否已经计数过（使用sessionStorage）
  useEffect(() => {
    const counted = sessionStorage.getItem('visitCounted');
    setHasCounted(counted === 'true');
  }, []);

  // 生成或获取会话ID
  useEffect(() => {
    let currentSessionId = sessionStorage.getItem('sessionId');
    if (!currentSessionId) {
      currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', currentSessionId);
    }
    setSessionId(currentSessionId);
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
      }
    };

    fetchVisitCount();
  }, []);

  // 更新在线状态
  const updateOnlineStatus = async () => {
    try {
      const userAgent = navigator.userAgent;
      const { data, error } = await supabase.functions.invoke('update-online-status', {
        body: {
          sessionId: sessionId,
          userAgent
        }
      });

      if (error) {
        console.error('Error updating online status:', error);
      } else if (data) {
        setOnlineCount(data.onlineUsers || 0);
      }
    } catch (error) {
      console.error('Error updating online status:', error);
    }
  };

  // 初始化在线状态
  useEffect(() => {
    if (sessionId) {
      updateOnlineStatus().finally(() => setLoading(false));
    }
  }, [sessionId]);

  // 记录访问
  useEffect(() => {
    if (!hasCounted && !loading && sessionId) {
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
  }, [hasCounted, loading, sessionId]);

  // 每30秒更新一次在线状态
  useEffect(() => {
    if (sessionId) {
      const interval = setInterval(updateOnlineStatus, 30000);
      return () => clearInterval(interval);
    }
  }, [sessionId]);

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

  const stats = [
    {
      id: 1,
      icon: Calendar,
      value: new Date(visitData.date).toLocaleDateString('zh-CN', { 
        month: '2-digit', 
        day: '2-digit' 
      }),
      label: "统计日期",
      color: "green",
      delay: 0.1
    },
    {
      id: 2,
      icon: Wifi,
      value: onlineCount.toString(),
      label: "在线用户",
      color: "indigo",
      delay: 0.2
    },
    {
      id: 3,
      icon: TrendingUp,
      value: visitData.totalCount.toLocaleString(),
      label: "累计使用人次",
      color: "red",
      delay: 0.3
    },
    {
      id: 4,
      icon: Activity,
      value: visitData.todayCount.toLocaleString(),
      label: "今日访问量",
      color: "blue",
      delay: 0.4
    },
    {
      id: 5,
      icon: Heart,
      value: visitData.servedPatients.toLocaleString(),
      label: "服务患者数量",
      color: "pink",
      delay: 0.5
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: {
        bg: 'bg-red-500',
        text: 'text-red-600 dark:text-red-400',
        icon: 'text-red-500',
        gradient: 'from-red-400 to-red-500'
      },
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600 dark:text-blue-400',
        icon: 'text-blue-500',
        gradient: 'from-blue-400 to-blue-500'
      },
      pink: {
        bg: 'bg-pink-500',
        text: 'text-pink-600 dark:text-pink-400',
        icon: 'text-pink-500',
        gradient: 'from-pink-400 to-pink-500'
      },
      green: {
        bg: 'bg-green-500',
        text: 'text-green-600 dark:text-green-400',
        icon: 'text-green-500',
        gradient: 'from-green-400 to-green-500'
      },
      indigo: {
        bg: 'bg-indigo-500',
        text: 'text-indigo-600 dark:text-indigo-400',
        icon: 'text-indigo-500',
        gradient: 'from-indigo-400 to-indigo-500'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 rounded-lg shadow-md p-4 mb-6 border border-red-200 dark:border-red-800"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 p-2 rounded-full"
          >
            <Users className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              使用统计
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              小红卡急症处理指引生成器
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-2 mb-3">
        {stats.map((stat) => {
          const colorClasses = getColorClasses(stat.color);
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.id}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: stat.delay }}
              className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Icon className={`h-4 w-4 ${colorClasses.icon}`} />
                <span className={`text-lg font-bold ${colorClasses.text} leading-tight`}>
                  {stat.value}
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, delay: 0.6 }}
        className="h-1 bg-gradient-to-r from-red-400 via-pink-400 to-indigo-400 rounded-full"
      />
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500 text-center">
        感谢您的使用，每一次访问都是对我们工作的肯定 ❤️
      </div>
    </motion.div>
  );
}