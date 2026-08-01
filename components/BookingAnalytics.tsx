'use client';

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import {
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  DollarSign,
  PieChart as PieChartIcon,
  BarChart3,
  Sparkles,
  Filter,
} from 'lucide-react';

interface BookingAnalyticsProps {
  bookings: any[];
  services: any[];
  slots: string[];
}

const STATUS_COLORS: Record<string, string> = {
  Confirmed: '#10B981', // Emerald
  Pending: '#F59E0B',   // Amber
  Completed: '#3B82F6', // Blue
  Cancelled: '#EF4444', // Red
};

export default function BookingAnalytics({ bookings, services, slots }: BookingAnalyticsProps) {
  const [filterPeriod, setFilterPeriod] = useState<'all' | '30' | '7'>('all');

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    if (filterPeriod === 'all') return bookings;
    const now = new Date();
    const days = filterPeriod === '30' ? 30 : 7;
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return bookings.filter((b) => {
      if (!b.date) return true;
      const bDate = new Date(b.date);
      return bDate >= cutoff;
    });
  }, [bookings, filterPeriod]);

  // Key KPI calculations
  const totalBookings = filteredBookings.length;
  const confirmedCount = filteredBookings.filter((b) => b.status === 'Confirmed').length;
  const completedCount = filteredBookings.filter((b) => b.status === 'Completed').length;
  const pendingCount = filteredBookings.filter((b) => b.status === 'Pending').length;
  const cancelledCount = filteredBookings.filter((b) => b.status === 'Cancelled').length;

  const completionRate = totalBookings > 0 ? Math.round(((confirmedCount + completedCount) / totalBookings) * 100) : 0;

  // Estimated Revenue Calculation ($250 per strategy, $500 per discovery, $750 per growth audit)
  const estimatedRevenue = useMemo(() => {
    return filteredBookings.reduce((acc, b) => {
      if (b.status === 'Cancelled') return acc;
      const serviceName = (b.service || '').toLowerCase();
      if (serviceName.includes('audit') || serviceName.includes('e-commerce')) return acc + 750;
      if (serviceName.includes('discovery') || serviceName.includes('project')) return acc + 500;
      return acc + 250;
    }, 0);
  }, [filteredBookings]);

  // Status Distribution for Pie Chart
  const statusData = useMemo(() => {
    return [
      { name: 'Confirmed', value: confirmedCount || 0 },
      { name: 'Pending', value: pendingCount || 0 },
      { name: 'Completed', value: completedCount || 0 },
      { name: 'Cancelled', value: cancelledCount || 0 },
    ].filter((item) => item.value > 0);
  }, [confirmedCount, pendingCount, completedCount, cancelledCount]);

  // Busiest Time Slots Data for Bar Chart
  const timeSlotData = useMemo(() => {
    const defaultSlots = slots && slots.length > 0 ? slots : ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];
    const slotCounts: Record<string, number> = {};

    defaultSlots.forEach((s) => (slotCounts[s] = 0));

    filteredBookings.forEach((b) => {
      const slot = b.time || '09:00 AM';
      slotCounts[slot] = (slotCounts[slot] || 0) + 1;
    });

    return Object.entries(slotCounts).map(([slot, count]) => ({
      slot,
      bookings: count,
    }));
  }, [filteredBookings, slots]);

  // Conversion / Popularity by Service Type Data
  const serviceData = useMemo(() => {
    const defaultServices = services && services.length > 0
      ? services.map((s) => s.title)
      : ['30 Min Strategy Call', 'Project Discovery', 'E-Commerce Growth Audit'];

    const counts: Record<string, { total: number; confirmed: number }> = {};

    defaultServices.forEach((s) => {
      counts[s] = { total: 0, confirmed: 0 };
    });

    filteredBookings.forEach((b) => {
      const svc = b.service || '30 Min Strategy Call';
      if (!counts[svc]) counts[svc] = { total: 0, confirmed: 0 };
      counts[svc].total += 1;
      if (b.status === 'Confirmed' || b.status === 'Completed') {
        counts[svc].confirmed += 1;
      }
    });

    return Object.entries(counts).map(([service, data]) => ({
      service: service.length > 18 ? service.substring(0, 18) + '...' : service,
      fullTitle: service,
      Total: data.total,
      Confirmed: data.confirmed,
      ConversionRate: data.total > 0 ? Math.round((data.confirmed / data.total) * 100) : 0,
    }));
  }, [filteredBookings, services]);

  // Most popular service name
  const mostPopularService = useMemo(() => {
    if (serviceData.length === 0) return 'N/A';
    const sorted = [...serviceData].sort((a, b) => b.Total - a.Total);
    return sorted[0]?.fullTitle || 'N/A';
  }, [serviceData]);

  // Booking Trend Over Time (grouped by date)
  const trendData = useMemo(() => {
    const dateMap: Record<string, number> = {};

    // Sort bookings by date
    const sorted = [...filteredBookings].sort((a, b) => new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime());

    sorted.forEach((b) => {
      const dateStr = b.date || '2026-08-01';
      dateMap[dateStr] = (dateMap[dateStr] || 0) + 1;
    });

    const entries = Object.entries(dateMap);
    if (entries.length === 0) {
      return [
        { date: 'Mon', bookings: 2 },
        { date: 'Tue', bookings: 4 },
        { date: 'Wed', bookings: 3 },
        { date: 'Thu', bookings: 6 },
        { date: 'Fri', bookings: 5 },
      ];
    }

    return entries.slice(-10).map(([date, count]) => ({
      date: date.length > 5 ? date.substring(5) : date,
      bookings: count,
    }));
  }, [filteredBookings]);

  return (
    <div className="space-y-6">
      {/* HEADER & FILTER BAR */}
      <div className="bg-[#1C1712] border border-[#2C2419] rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#E59500]" />
            <h2 className="text-lg font-bold text-[#F9F7F2]">Booking Performance & Consultation Analytics</h2>
          </div>
          <p className="text-xs text-[#A69D92] mt-1">
            Real-time insights into appointment distribution, slot density, service conversions, and forecasted pipeline revenue.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto bg-[#15120E] p-1.5 border border-[#2C2419] rounded-xl">
          <Filter className="w-3.5 h-3.5 text-[#A69D92] ml-2" />
          <button
            onClick={() => setFilterPeriod('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterPeriod === 'all'
                ? 'bg-[#E59500] text-[#15120E] shadow'
                : 'text-[#A69D92] hover:text-[#F9F7F2]'
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setFilterPeriod('30')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterPeriod === '30'
                ? 'bg-[#E59500] text-[#15120E] shadow'
                : 'text-[#A69D92] hover:text-[#F9F7F2]'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setFilterPeriod('7')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterPeriod === '7'
                ? 'bg-[#E59500] text-[#15120E] shadow'
                : 'text-[#A69D92] hover:text-[#F9F7F2]'
            }`}
          >
            Last 7 Days
          </button>
        </div>
      </div>

      {/* METRICS SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1 */}
        <div className="bg-[#1C1712] border border-[#2C2419] p-5 rounded-2xl relative overflow-hidden group hover:border-[#E59500]/50 transition-all shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#A69D92] uppercase tracking-wider font-bold">
              Total Appointments
            </span>
            <div className="p-2.5 bg-[#E59500]/10 text-[#E59500] rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#F9F7F2] font-mono">{totalBookings}</span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-[#10B981]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{confirmedCount} Confirmed & Active</span>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#1C1712] border border-[#2C2419] p-5 rounded-2xl relative overflow-hidden group hover:border-[#10B981]/50 transition-all shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#A69D92] uppercase tracking-wider font-bold">
              Conversion Rate
            </span>
            <div className="p-2.5 bg-[#10B981]/10 text-[#10B981] rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#F9F7F2] font-mono">{completionRate}%</span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-[#A69D92]">
              <span>Confirmed + Completed ratio</span>
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="bg-[#1C1712] border border-[#2C2419] p-5 rounded-2xl relative overflow-hidden group hover:border-[#E59500]/50 transition-all shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#A69D92] uppercase tracking-wider font-bold">
              Pipeline Value
            </span>
            <div className="p-2.5 bg-[#E59500]/10 text-[#E59500] rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#E59500] font-mono">
              ${estimatedRevenue.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-[#A69D92]">
              <span>Est. consultation value</span>
            </div>
          </div>
        </div>

        {/* CARD 4 */}
        <div className="bg-[#1C1712] border border-[#2C2419] p-5 rounded-2xl relative overflow-hidden group hover:border-[#3B82F6]/50 transition-all shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#A69D92] uppercase tracking-wider font-bold">
              Top Service
            </span>
            <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm font-bold text-[#F9F7F2] line-clamp-1 block">{mostPopularService}</span>
            <div className="flex items-center gap-1 mt-2 text-[11px] text-[#A69D92]">
              <span>Highest client interest</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS GRID 1: STATUS DISTRIBUTION & BUSIEST TIME SLOTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DONUT CHART: APPOINTMENT STATUS */}
        <div className="bg-[#1C1712] border border-[#2C2419] p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-[#E59500]" />
              <h3 className="text-sm font-bold text-[#F9F7F2]">Appointment Status Breakdown</h3>
            </div>
            <span className="text-[10px] font-mono bg-[#15120E] border border-[#2C2419] px-2.5 py-1 rounded-full text-[#A69D92]">
              Ratio
            </span>
          </div>

          <div className="h-[260px] w-full relative flex items-center justify-center">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#E59500'} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#15120E',
                      borderColor: '#2C2419',
                      borderRadius: '12px',
                      color: '#F9F7F2',
                      fontSize: '12px',
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-xs text-[#A69D92]">No appointment status data recorded.</div>
            )}
          </div>
        </div>

        {/* BAR CHART: BUSIEST TIME SLOTS */}
        <div className="bg-[#1C1712] border border-[#2C2419] p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E59500]" />
              <h3 className="text-sm font-bold text-[#F9F7F2]">Busiest Time Slots Density</h3>
            </div>
            <span className="text-[10px] font-mono bg-[#15120E] border border-[#2C2419] px-2.5 py-1 rounded-full text-[#A69D92]">
              Slot Demand
            </span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSlotData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C2419" vertical={false} />
                <XAxis dataKey="slot" tick={{ fill: '#A69D92', fontSize: 11 }} axisLine={{ stroke: '#2C2419' }} />
                <YAxis allowDecimals={false} tick={{ fill: '#A69D92', fontSize: 11 }} axisLine={{ stroke: '#2C2419' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#15120E',
                    borderColor: '#2C2419',
                    borderRadius: '12px',
                    color: '#F9F7F2',
                    fontSize: '12px',
                  }}
                  cursor={{ fill: 'rgba(229, 149, 0, 0.05)' }}
                />
                <Bar dataKey="bookings" name="Bookings" fill="#E59500" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CHARTS GRID 2: SERVICE CONVERSIONS & BOOKING TREND */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SERVICE TYPE CONVERSION & POPULARITY */}
        <div className="bg-[#1C1712] border border-[#2C2419] p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#E59500]" />
              <h3 className="text-sm font-bold text-[#F9F7F2]">Service Popularity & Conversion</h3>
            </div>
            <span className="text-[10px] font-mono bg-[#15120E] border border-[#2C2419] px-2.5 py-1 rounded-full text-[#A69D92]">
              Comparison
            </span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C2419" vertical={false} />
                <XAxis dataKey="service" tick={{ fill: '#A69D92', fontSize: 10 }} axisLine={{ stroke: '#2C2419' }} />
                <YAxis allowDecimals={false} tick={{ fill: '#A69D92', fontSize: 11 }} axisLine={{ stroke: '#2C2419' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#15120E',
                    borderColor: '#2C2419',
                    borderRadius: '12px',
                    color: '#F9F7F2',
                    fontSize: '12px',
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="Total" name="Total Inquiries" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Confirmed" name="Confirmed Calls" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOOKING VOLUME TREND AREA CHART */}
        <div className="bg-[#1C1712] border border-[#2C2419] p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E59500]" />
              <h3 className="text-sm font-bold text-[#F9F7F2]">Booking Velocity Trend</h3>
            </div>
            <span className="text-[10px] font-mono bg-[#15120E] border border-[#2C2419] px-2.5 py-1 rounded-full text-[#A69D92]">
              Timeline
            </span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E59500" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#E59500" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C2419" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#A69D92', fontSize: 11 }} axisLine={{ stroke: '#2C2419' }} />
                <YAxis allowDecimals={false} tick={{ fill: '#A69D92', fontSize: 11 }} axisLine={{ stroke: '#2C2419' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#15120E',
                    borderColor: '#2C2419',
                    borderRadius: '12px',
                    color: '#F9F7F2',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  name="Appointments"
                  stroke="#E59500"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorBookings)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
