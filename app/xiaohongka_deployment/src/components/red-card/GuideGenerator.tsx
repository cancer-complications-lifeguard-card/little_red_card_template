"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Download, 
  Share2,
  Heart,
  AlertTriangle,
  Phone,
  MapPin,
  User,
  Activity,
  Clock
} from "lucide-react";
import CardPreview from "./CardPreview";

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

const complications = [
  { id: 'bleeding', name: '消化道出血', description: '呕血、黑便等症状的紧急处理' },
  { id: 'obstruction', name: '肠梗阻', description: '腹痛、呕吐、腹胀等症状的紧急处理' },
  { id: 'biliary', name: '胆道梗阻', description: '黄疸、发热等症状管理' },
  { id: 'infection', name: '感染', description: '发热、感染征象监测' },
  { id: 'ascites', name: '腹水', description: '腹胀、腹水症状管理' },
  { id: 'thrombosis', name: '血栓', description: '血栓形成预防和处理' }
];

export default function GuideGenerator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    name: '',
    age: '',
    bloodType: '',
    mainDiagnosis: '',
    surgeryHistory: '',
    allergies: '',
    otherDiseases: '',
    isOnAnticoagulation: false,
    medicationType: '',
    lastTaken: '',
    stopReason: ''
  });
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [newContact, setNewContact] = useState<EmergencyContact>({ name: '', phone: '', relationship: '' });
  const [newHospital, setNewHospital] = useState<Hospital>({ name: '', emergency: '', address: '', features: '' });

  // 从localStorage加载数据
  useEffect(() => {
    const savedComplications = JSON.parse(localStorage.getItem('selectedComplications') || '[]');
    const savedMedicalInfo = JSON.parse(localStorage.getItem('medicalInfo') || '{}');
    const savedContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    const savedHospitals = JSON.parse(localStorage.getItem('hospitals') || '[]');
    
    if (savedComplications.length > 0) {
      setSelectedComplications(savedComplications);
    }
    
    if (Object.keys(savedMedicalInfo).length > 0) {
      setMedicalInfo(savedMedicalInfo);
    }
    
    if (savedContacts.length > 0) {
      setEmergencyContacts(savedContacts);
    }
    
    if (savedHospitals.length > 0) {
      setHospitals(savedHospitals);
    }
  }, []);
  
  // 保存数据到localStorage
  useEffect(() => {
    localStorage.setItem('selectedComplications', JSON.stringify(selectedComplications));
  }, [selectedComplications]);
  
  useEffect(() => {
    localStorage.setItem('medicalInfo', JSON.stringify(medicalInfo));
  }, [medicalInfo]);
  
  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
  }, [emergencyContacts]);
  
  useEffect(() => {
    localStorage.setItem('hospitals', JSON.stringify(hospitals));
  }, [hospitals]);

  const handleComplicationChange = (id: string) => {
    if (selectedComplications.includes(id)) {
      setSelectedComplications(selectedComplications.filter(c => c !== id));
    } else {
      setSelectedComplications([...selectedComplications, id]);
    }
  };

  const handleMedicalInfoChange = (field: keyof MedicalInfo, value: string | boolean) => {
    setMedicalInfo({
      ...medicalInfo,
      [field]: value
    });
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone && newContact.relationship) {
      setEmergencyContacts([...emergencyContacts, newContact]);
      setNewContact({ name: '', phone: '', relationship: '' });
    }
  };

  const handleRemoveContact = (index: number) => {
    const newContacts = [...emergencyContacts];
    newContacts.splice(index, 1);
    setEmergencyContacts(newContacts);
  };

  const handleAddHospital = () => {
    if (newHospital.name && newHospital.emergency && newHospital.address) {
      setHospitals([...hospitals, newHospital]);
      setNewHospital({ name: '', emergency: '', address: '', features: '' });
    }
  };

  const handleRemoveHospital = (index: number) => {
    const newHospitals = [...hospitals];
    newHospitals.splice(index, 1);
    setHospitals(newHospitals);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedComplications.length > 0;
      case 1: return medicalInfo.name && medicalInfo.bloodType;
      case 2: return emergencyContacts.length > 0 || hospitals.length > 0;
      default: return true;
    }
  };

  const steps = [
    { title: '选择并发症类型', icon: Activity },
    { title: '填写个人医疗信息', icon: User },
    { title: '添加紧急联系人和医院信息', icon: Phone },
    { title: '预览和下载', icon: Download }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">选择并发症类型</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {complications.map((comp, index) => (
                  <motion.div
                    key={comp.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      selectedComplications.includes(comp.id) 
                        ? 'ring-2 ring-red-500 bg-red-50 dark:bg-red-950' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleComplicationChange(comp.id)}
                  >
                    <Card className="h-full">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedComplications.includes(comp.id)}
                            onChange={() => {}}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                              {comp.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {comp.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">填写个人医疗信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  姓名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={medicalInfo.name}
                  onChange={(e) => handleMedicalInfoChange('name', e.target.value)}
                  placeholder="请填写患者真实姓名"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">年龄</Label>
                <Input
                  id="age"
                  value={medicalInfo.age}
                  onChange={(e) => handleMedicalInfoChange('age', e.target.value)}
                  placeholder="请填写患者年龄"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType" className="flex items-center gap-2">
                  血型 <span className="text-red-500">*</span>
                </Label>
                <Select value={medicalInfo.bloodType} onValueChange={(value) => handleMedicalInfoChange('bloodType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择血型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A型">A型</SelectItem>
                    <SelectItem value="B型">B型</SelectItem>
                    <SelectItem value="AB型">AB型</SelectItem>
                    <SelectItem value="O型">O型</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainDiagnosis">主要诊断</Label>
                <Input
                  id="mainDiagnosis"
                  value={medicalInfo.mainDiagnosis}
                  onChange={(e) => handleMedicalInfoChange('mainDiagnosis', e.target.value)}
                  placeholder="如：胰腺癌、胃癌等"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="surgeryHistory">手术史</Label>
                <Textarea
                  id="surgeryHistory"
                  value={medicalInfo.surgeryHistory}
                  onChange={(e) => handleMedicalInfoChange('surgeryHistory', e.target.value)}
                  placeholder="请填写手术史"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">过敏史</Label>
                <Input
                  id="allergies"
                  value={medicalInfo.allergies}
                  onChange={(e) => handleMedicalInfoChange('allergies', e.target.value)}
                  placeholder="请填写过敏史"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherDiseases">其他疾病</Label>
                <Input
                  id="otherDiseases"
                  value={medicalInfo.otherDiseases}
                  onChange={(e) => handleMedicalInfoChange('otherDiseases', e.target.value)}
                  placeholder="请填写其他疾病"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  抗凝治疗信息
                </Label>
                <Select 
                  value={medicalInfo.isOnAnticoagulation ? 'true' : 'false'} 
                  onValueChange={(value) => handleMedicalInfoChange('isOnAnticoagulation', value === 'true')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">否</SelectItem>
                    <SelectItem value="true">是</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {medicalInfo.isOnAnticoagulation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:col-span-2 space-y-4 border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950 p-4 rounded"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medicationType">抗凝药物种类</Label>
                      <Input
                        id="medicationType"
                        value={medicalInfo.medicationType}
                        onChange={(e) => handleMedicalInfoChange('medicationType', e.target.value)}
                        placeholder="请填写抗凝药物种类"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastTaken">最后服用时间</Label>
                      <Input
                        id="lastTaken"
                        value={medicalInfo.lastTaken}
                        onChange={(e) => handleMedicalInfoChange('lastTaken', e.target.value)}
                        placeholder="请填写最后服用时间"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stopReason">停药原因</Label>
                      <Input
                        id="stopReason"
                        value={medicalInfo.stopReason}
                        onChange={(e) => handleMedicalInfoChange('stopReason', e.target.value)}
                        placeholder="请填写停药原因"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">添加紧急联系人和医院信息</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold">紧急联系人</h3>
              </div>
              
              {emergencyContacts.map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="relative"
                >
                  <Card className="border-red-200 dark:border-red-800">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4 text-red-500" />
                            <span className="font-semibold">{contact.name}</span>
                            <Badge variant="secondary">{contact.relationship}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="h-4 w-4" />
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveContact(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">姓名</Label>
                        <Input
                          id="contact-name"
                          value={newContact.name}
                          onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                          placeholder="请填写联系人姓名"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">电话</Label>
                        <Input
                          id="contact-phone"
                          value={newContact.phone}
                          onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                          placeholder="请填写联系人电话"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-relationship">关系</Label>
                        <Input
                          id="contact-relationship"
                          value={newContact.relationship}
                          onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                          placeholder="请填写与患者关系"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleAddContact}
                      className="w-full"
                      disabled={!newContact.name || !newContact.phone || !newContact.relationship}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加紧急联系人
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold">医院信息</h3>
              </div>
              
              {hospitals.map((hospital, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="relative"
                >
                  <Card className="border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span className="font-semibold">{hospital.name}</span>
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
                              <div className="mt-2">
                                <Badge variant="outline">{hospital.features}</Badge>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveHospital(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hospital-name">医院名称</Label>
                        <Input
                          id="hospital-name"
                          value={newHospital.name}
                          onChange={(e) => setNewHospital({...newHospital, name: e.target.value})}
                          placeholder="请填写医院名称"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hospital-emergency">急诊电话</Label>
                        <Input
                          id="hospital-emergency"
                          value={newHospital.emergency}
                          onChange={(e) => setNewHospital({...newHospital, emergency: e.target.value})}
                          placeholder="请填写急诊电话"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hospital-address">地址</Label>
                        <Input
                          id="hospital-address"
                          value={newHospital.address}
                          onChange={(e) => setNewHospital({...newHospital, address: e.target.value})}
                          placeholder="请填写医院地址"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hospital-features">特色（选填）</Label>
                        <Input
                          id="hospital-features"
                          value={newHospital.features}
                          onChange={(e) => setNewHospital({...newHospital, features: e.target.value})}
                          placeholder="请填写医院特色"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleAddHospital}
                      className="w-full"
                      disabled={!newHospital.name || !newHospital.emergency || !newHospital.address}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加医院信息
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CardPreview 
              selectedComplications={selectedComplications}
              medicalInfo={medicalInfo}
              emergencyContacts={emergencyContacts}
              hospitals={hospitals}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Steps Progress */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col items-center flex-1 relative"
          >
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                currentStep >= index
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <step.icon className="h-6 w-6" />
            </motion.div>
            <span className={`text-sm font-medium text-center ${
              currentStep >= index
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 dark:bg-gray-600 -z-10" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {currentStep < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            上一步
          </Button>
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
          >
            {currentStep === 2 ? '生成指引卡片' : '下一步'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}