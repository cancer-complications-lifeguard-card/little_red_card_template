import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // 调用 Supabase Edge Function 获取访问统计
    const { data, error } = await supabase.functions.invoke('get-visit-stats');
    
    if (error) {
      console.error('Error calling get-visit-stats:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to get visit stats' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      todayCount: data?.todayVisits || 0,
      totalCount: data?.totalVisits || 0,
      servedPatients: data?.servedPatients || 0,
      date: new Date().toDateString()
    });
  } catch (error) {
    console.error('Error getting visit count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get visit count' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    
    // 获取用户代理信息
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // 调用 Supabase Edge Function 增加访问统计
    const { data, error } = await supabase.functions.invoke('increment-visit', {
      body: {
        date,
        userAgent
      }
    });

    if (error) {
      console.error('Error calling increment-visit:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to increment visit count' },
        { status: 500 }
      );
    }

    // 获取客户端IP
    const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';

    console.log(`New visit from ${clientIP}. Today: ${data?.todayVisits || 0}, Total: ${data?.totalVisits || 0}`);

    return NextResponse.json({
      success: true,
      todayCount: data?.todayVisits || 0,
      totalCount: data?.totalVisits || 0,
      servedPatients: data?.servedPatients || 0,
      date: new Date().toDateString()
    });
  } catch (error) {
    console.error('Error updating visit count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update visit count' },
      { status: 500 }
    );
  }
}