"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, Wifi } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function OnlineUserTracker() {
  const [onlineCount, setOnlineCount] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 生成或获取会话ID
    let currentSessionId = sessionStorage.getItem('sessionId');
    if (!currentSessionId) {
      currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', currentSessionId);
    }
    setSessionId(currentSessionId);

    // 更新在线状态
    const updateOnlineStatus = async () => {
      try {
        const userAgent = navigator.userAgent;
        const { data, error } = await supabase.functions.invoke('update-online-status', {
          body: {
            sessionId: currentSessionId,
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

    // 立即更新一次
    updateOnlineStatus().finally(() => setLoading(false));

    // 每30秒更新一次在线状态
    const interval = setInterval(updateOnlineStatus, 30000);

    // 页面卸载时清理
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 mb-4"
      >
        <div className="flex items-center justify-center h-12">
          <div className="animate-pulse flex space-x-2">
            <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-3 w-3"></div>
            <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-3 w-3"></div>
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
      className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg shadow-md p-4 mb-4 border border-blue-200 dark:border-blue-800"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 p-2 rounded-full"
          >
            <Wifi className="h-4 w-4 text-white" />
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              在线用户
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              实时统计
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Users className="h-4 w-4 text-blue-500" />
          </motion.div>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {onlineCount}
          </span>
        </div>
      </div>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, delay: 0.3 }}
        className="h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mt-2"
      />
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500 text-center">
        当前在线用户数（每30秒更新）
      </div>
    </motion.div>
  );
}