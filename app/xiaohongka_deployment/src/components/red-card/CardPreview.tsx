"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share2, 
  Heart, 
  AlertTriangle, 
  Phone, 
  MapPin, 
  User,
  Activity,
  Clock,
  Shield,
  FileText
} from "lucide-react";

interface MedicalInfo {
  name: string;
  age: string;
  bloodType: string;
  mainDiagnosis: string;
  surgeryHistory: string;
  allergies: string;
  otherDiseases: string;
  isOnAnticoagulation: boolean;
  medicationType: string;
  lastTaken: string;
  stopReason: string;
}

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface Hospital {
  name: string;
  emergency: string;
  address: string;
  features: string;
}

interface CardPreviewProps {
  selectedComplications: string[];
  medicalInfo: MedicalInfo;
  emergencyContacts: EmergencyContact[];
  hospitals: Hospital[];
}

export default function CardPreview({ 
  selectedComplications, 
  medicalInfo, 
  emergencyContacts, 
  hospitals 
}: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getEmergencyGuidance = () => {
    const guidance: Array<{
      title: string;
      steps: string[];
      warnings: string[];
    }> = [];
    
    if (selectedComplications.includes('bleeding')) {
      guidance.push({
        title: '消化道出血急救',
        steps: [
          '立即拨打120，告知消化道出血',
          '绝对禁食禁水，保持呼吸道通畅',
          '侧卧位，防止呕吐物误吸',
          '记录呕血和黑便的量、颜色和时间',
          '保存呕吐物样本，供医生查看'
        ],
        warnings: [
          '禁止使用止痛药，可能掩盖症状',
          '禁止热敷腹部，可能加重出血',
          '禁止自行服用止血药'
        ]
      });
    }
    
    if (selectedComplications.includes('obstruction')) {
      guidance.push({
        title: '肠梗阻急救',
        steps: [
          '立即拨打120，告知肠梗阻症状',
          '绝对禁食禁水，减轻肠道负担',
          '禁止催吐，防止肠道穿孔',
          '禁止使用止痛药，避免掩盖症状',
          '禁止热敷腹部，防止肠管扩张'
        ],
        warnings: [
          '禁止按摩腹部，可能导致肠穿孔',
          '禁止使用泻药或灌肠，加重肠管损伤',
          '禁止进食任何食物或液体'
        ]
      });
    }
    
    if (selectedComplications.includes('biliary')) {
      guidance.push({
        title: '胆道梗阻急救',
        steps: [
          '立即拨打120，告知黄疸、发热症状',
          '绝对禁食禁水，减轻肝脏负担',
          '记录体温变化，监测发热规律',
          '观察皮肤和巩膜黄染程度',
          '记录腹痛性质和部位变化'
        ],
        warnings: [
          '禁止使用对肝脏有损害的药物',
          '禁止饮酒，加重肝脏负担',
          '禁止高脂饮食，加重胆道负担'
        ]
      });
    }
    
    if (selectedComplications.includes('infection')) {
      guidance.push({
        title: '感染急救',
        steps: [
          '立即拨打120，告知高热、感染症状',
          '保持休息，减少体力消耗',
          '补充水分，防止脱水',
          '记录体温变化和发热规律',
          '观察有无寒战、出汗等症状'
        ],
        warnings: [
          '禁止自行使用抗生素，可能导致耐药',
          '禁止捂汗，可能加重高热',
          '禁止擅自降温，可能掩盖病情'
        ]
      });
    }
    
    if (selectedComplications.includes('ascites')) {
      guidance.push({
        title: '腹水急救',
        steps: [
          '立即拨打120，告知严重腹胀、呼吸困难',
          '半坐卧位，减轻呼吸困难',
          '限制水分和盐分摄入',
          '记录腹围变化，观察腹胀程度',
          '测量体重变化，监测腹水增减'
        ],
        warnings: [
          '禁止大量饮水，加重腹水',
          '禁止高盐饮食，增加水钠潴留',
          '禁止腹部按摩，可能导致不适'
        ]
      });
    }
    
    if (selectedComplications.includes('thrombosis')) {
      guidance.push({
        title: '血栓急救',
        steps: [
          '立即拨打120，告知肢体肿胀、疼痛',
          '保持患肢休息，避免活动',
          '抬高患肢，减轻肿胀和疼痛',
          '记录肢体肤色和温度变化',
          '避免按摩患处，防止血栓脱落'
        ],
        warnings: [
          '禁止热敷患处，可能加重血栓',
          '禁止剧烈运动，可能导致血栓脱落',
          '禁止自行服用抗凝药，可能导致出血'
        ]
      });
    }
    
    return guidance;
  };

  const getDiagnosisGuidance = () => {
    const guidance: Array<{
      title: string;
      points: string[];
    }> = [];
    
    if (selectedComplications.includes('bleeding')) {
      guidance.push({
        title: '消化道出血诊断要点',
        points: [
          '呕血颜色：鲜红色提示活动性出血，咖啡色提示出血较慢或已停止',
          '黑便：柏油样便提示上消化道出血，暗红色便提示下消化道出血',
          '生命体征：心率增快、血压下降提示失血较多',
          '伴随症状：头晕、心慌、出冷汗提示休克前期'
        ]
      });
    }
    
    if (selectedComplications.includes('obstruction')) {
      guidance.push({
        title: '肠梗阻诊断要点',
        points: [
          '腹痛：阵发性绞痛提示机械性梗阻，持续性胀痛提示麻痹性梗阻',
          '呕吐：呕吐物含胆汁提示高位梗阻，含粪样物质提示低位梗阻',
          '腹胀：腹部膨隆，可见肠型和蠕动波',
          '停止排气排便：完全性肠梗阻的典型表现',
          '腹部X线：可见液气平面和肠管扩张'
        ]
      });
    }
    
    if (selectedComplications.includes('biliary')) {
      guidance.push({
        title: '胆道梗阻诊断要点',
        points: [
          '黄疸：皮肤和巩膜黄染，尿色加深，大便颜色变浅',
          '腹痛：右上腹持续性胀痛，可向右肩放射',
          '发热：提示合并感染，如胆管炎',
          'Charcot三联征：腹痛、寒战高热、黄疸提示急性胆管炎',
          '实验室检查：总胆红素、直接胆红素升高，碱性磷酸酶升高'
        ]
      });
    }
    
    if (selectedComplications.includes('infection')) {
      guidance.push({
        title: '感染诊断要点',
        points: [
          '体温：持续高热或体温不升',
          '血常规：白细胞计数升高，中性粒细胞比例升高',
          'C反应蛋白：明显升高',
          '降钙素原：严重细菌感染时升高',
          '感染灶：局部红肿热痛，或有分泌物'
        ]
      });
    }
    
    if (selectedComplications.includes('ascites')) {
      guidance.push({
        title: '腹水诊断要点',
        points: [
          '腹胀：腹部膨隆，腹围增加',
          '移动性浊音：体位改变时浊音区移动',
          '液波震颤：大量腹水时出现',
          '超声检查：腹腔内游离液体',
          '腹水检查：明确腹水性质（漏出液、渗出液）'
        ]
      });
    }
    
    if (selectedComplications.includes('thrombosis')) {
      guidance.push({
        title: '血栓诊断要点',
        points: [
          '肢体肿胀：单侧肢体明显肿胀',
          '疼痛：肢体胀痛或压痛',
          '皮肤温度：患肢皮肤温度升高',
          '皮肤颜色：患肢皮肤发红或发绀',
          '血管超声：可见血管内血栓形成'
        ]
      });
    }
    
    return guidance;
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      if (cardRef.current) {
        // 创建一个简单的canvas来模拟图片生成
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('无法创建canvas上下文');
        }
        
        // 设置canvas尺寸
        canvas.width = 800;
        canvas.height = 1200;
        
        // 设置背景色
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制标题栏
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(0, 0, canvas.width, 100);
        
        // 绘制标题文字
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px Arial';
        ctx.fillText('小红卡', 50, 40);
        ctx.font = '20px Arial';
        ctx.fillText('并发症管理指引', 50, 70);
        
        // 绘制生成时间
        ctx.font = '16px Arial';
        ctx.fillText(`生成时间: ${new Date().toLocaleDateString('zh-CN')}`, canvas.width - 200, 70);
        
        // 绘制患者信息
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('患者信息', 50, 140);
        
        ctx.font = '16px Arial';
        ctx.fillText(`姓名: ${medicalInfo.name || '未填写'}`, 50, 170);
        ctx.fillText(`年龄: ${medicalInfo.age || '未填写'}`, 250, 170);
        ctx.fillText(`血型: ${medicalInfo.bloodType || '未填写'}`, 450, 170);
        ctx.fillText(`主要诊断: ${medicalInfo.mainDiagnosis || '未填写'}`, 50, 200);
        
        // 绘制急救指引
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('🆘 急救指导步骤', 50, 250);
        
        ctx.fillStyle = '#000000';
        ctx.font = '16px Arial';
        let yPos = 280;
        
        emergencyGuidance.forEach((guide) => {
          ctx.font = 'bold 18px Arial';
          ctx.fillText(guide.title, 50, yPos);
          yPos += 30;
          
          ctx.font = '16px Arial';
          ctx.fillText('处理步骤：', 50, yPos);
          yPos += 25;
          
          guide.steps.forEach((step) => {
            ctx.fillText(`• ${step}`, 70, yPos);
            yPos += 25;
          });
          
          yPos += 10;
        });
        
        // 创建下载链接
        const link = document.createElement('a');
        link.download = `小红卡-${medicalInfo.name || '未命名'}-${new Date().toLocaleDateString('zh-CN')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (error) {
      console.error('生成图片失败:', error);
      alert('图片生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    // 模拟分享功能
    if (navigator.share) {
      navigator.share({
        title: '我的小红卡',
        text: '并发症管理指引卡片',
        url: window.location.href
      });
    } else {
      alert('分享功能已准备就绪！');
    }
  };

  const emergencyGuidance = getEmergencyGuidance();
  const diagnosisGuidance = getDiagnosisGuidance();

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center gap-4"
      >
        <Button
          onClick={handleDownload}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
        >
          {isGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="h-4 w-4" />
            </motion.div>
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isGenerating ? '生成中...' : '下载卡片'}
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          分享
        </Button>
      </motion.div>

      {/* Card Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        ref={cardRef}
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
      >
        {/* Card Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 border-2 border-red-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">小红卡</h1>
                <p className="text-red-100">并发症管理指引</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-100">生成时间</div>
              <div className="text-sm font-medium">
                {new Date().toLocaleDateString('zh-CN')}
              </div>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold">患者信息</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">姓名</div>
              <div className="font-medium">{medicalInfo.name || '未填写'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">年龄</div>
              <div className="font-medium">{medicalInfo.age || '未填写'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">血型</div>
              <div className="font-medium">{medicalInfo.bloodType || '未填写'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">主要诊断</div>
              <div className="font-medium">{medicalInfo.mainDiagnosis || '未填写'}</div>
            </div>
          </div>
          {medicalInfo.isOnAnticoagulation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-3 bg-red-50 dark:bg-red-950 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="font-medium text-red-700 dark:text-red-300">抗凝治疗信息</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">药物种类：</span>
                  <span className="font-medium">{medicalInfo.medicationType}</span>
                </div>
                <div>
                  <span className="text-gray-500">最后服用：</span>
                  <span className="font-medium">{medicalInfo.lastTaken}</span>
                </div>
                <div>
                  <span className="text-gray-500">停药原因：</span>
                  <span className="font-medium">{medicalInfo.stopReason}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Emergency Guidance */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-red-100 rounded-full p-1">
              <Shield className="h-5 w-5 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold">🆘 急救指导步骤</h2>
          </div>
          <div className="space-y-4">
            {emergencyGuidance.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-red-50 dark:bg-red-950 rounded-lg p-4 border-l-4 border-red-500"
              >
                <h3 className="font-semibold text-red-700 dark:text-red-300 mb-3">
                  {guide.title}
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">处理步骤：</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">注意事项：</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-red-600 dark:text-red-400">
                      {guide.warnings.map((warning, warningIndex) => (
                        <li key={warningIndex}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Diagnosis Guidance */}
        {diagnosisGuidance.length > 0 && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-100 rounded-full p-1">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold">🔍 病情诊断关键指引</h2>
            </div>
            <div className="space-y-4">
              {diagnosisGuidance.map((guide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 border-l-4 border-blue-500"
                >
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
                    {guide.title}
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {guide.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        {(emergencyContacts.length > 0 || hospitals.length > 0) && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-100 rounded-full p-1">
                <Phone className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="text-lg font-semibold">🤝 辅助服务</h2>
            </div>
            
            {emergencyContacts.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">紧急联系人</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {emergencyContacts.map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{contact.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {contact.relationship}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="h-4 w-4" />
                        <span>{contact.phone}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {hospitals.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">医院信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {hospitals.map((hospital, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{hospital.name}</span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>急诊: {hospital.emergency}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{hospital.address}</span>
                        </div>
                        {hospital.features && (
                          <Badge variant="outline" className="text-xs">
                            {hospital.features}
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Card Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 小红卡 - 为您的健康保驾护航，由小红卡开源社区 x 小x宝社区联合提供公益服务
          </p>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-blue-500" />
          <span className="font-medium text-blue-700 dark:text-blue-300">使用提示</span>
        </div>
        <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
          <li>• 请将此卡片保存在手机中，以便紧急情况下快速查看</li>
          <li>• 建议打印一份纸质卡片放在钱包或包中</li>
          <li>• 定期更新个人信息和联系方式</li>
          <li>• 如有任何疑问，请及时咨询专业医生</li>
        </ul>
      </motion.div>
    </div>
  );
}