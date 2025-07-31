import { NextRequest, NextResponse } from 'next/server';

// 本地数据存储（用于开发环境和构建环境）
let localVisitData = {
  todayCount: 0,
  totalCount: 0,
  servedPatients: 0,
  date: new Date().toDateString()
};

export async function GET() {
  try {
    // 在生产环境中尝试使用 Supabase
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase.functions.invoke('get-visit-stats');
        
        if (!error && data) {
          return NextResponse.json({
            success: true,
            todayCount: data?.todayVisits || 0,
            totalCount: data?.totalVisits || 0,
            servedPatients: data?.servedPatients || 0,
            date: new Date().toDateString()
          });
        }
      } catch (supabaseError) {
        console.warn('Supabase not available, using local data:', supabaseError);
      }
    }

    // 使用本地数据作为回退
    return NextResponse.json({
      success: true,
      ...localVisitData
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
    // 在生产环境中尝试使用 Supabase
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
        const userAgent = request.headers.get('user-agent') || 'Unknown';

        const { data, error } = await supabase.functions.invoke('increment-visit', {
          body: { date, userAgent }
        });

        if (!error && data) {
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
        }
      } catch (supabaseError) {
        console.warn('Supabase not available, using local data:', supabaseError);
      }
    }

    // 使用本地数据作为回退
    const today = new Date().toDateString();
    if (localVisitData.date !== today) {
      localVisitData = {
        todayCount: 1,
        totalCount: localVisitData.totalCount + 1,
        servedPatients: localVisitData.servedPatients + 1,
        date: today
      };
    } else {
      localVisitData.todayCount++;
      localVisitData.totalCount++;
      localVisitData.servedPatients++;
    }

    const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';

    console.log(`New visit from ${clientIP}. Today: ${localVisitData.todayCount}, Total: ${localVisitData.totalCount}`);

    return NextResponse.json({
      success: true,
      ...localVisitData
    });
  } catch (error) {
    console.error('Error updating visit count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update visit count' },
      { status: 500 }
    );
  }
}