import React from 'react';
import { ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const MOOD_SCORES = {
  'Happy 😀': 8,
  'Sad 😞': 3,
  'Angry 😠': 2,
  'Calm 😌': 7,
  'Stressed 😖': 4,
  'Tired 😩': 4,
  'Excited 🤩': 9,
  'Bored 😒': 5,
  'Anxious 😟': 4,
  'Grateful 🙏': 8,
  'Proud 😎': 9,
  'Confused 🤨': 5,
  'Hopeful 🤞': 7,
  'Lonely 🥺': 3,
  'Loved 🥰': 10,
  'Jealous 😒': 3,
  'Content ☺️': 7,
  'Frustrated 😤': 3,
  'Surprised 😲': 6
};

function MoodChart({ moods }) {
  const chartData = React.useMemo(() => {
    if (!moods || moods.length === 0) return [];

    const sortedMoods = [...moods].sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedMoods.map((m, index) => {
      const dateObj = new Date(m.date);
      return {
        id: `point-${index}`,
        name: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: dateObj.toLocaleDateString(),
        moodScore: MOOD_SCORES[m.mood] || 5, 
        energyLevel: m.energy || 5,
        rawMood: m.mood
      };
    });
  }, [moods]);

  if (chartData.length < 2) {
    return (
      <div className="w-full h-[200px] bg-white dark:bg-transparent border-[1.5px] border-[#e7e5e0] dark:border-[#44403c] rounded-xl flex items-center justify-center mb-10">
        <p className="text-[13.5px] text-[#a8a29e] dark:text-[#78716c]">Log at least two moods to see your chart.</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-[#1c1917] border-[1.5px] border-[#e7e5e0] dark:border-[#44403c] p-3 rounded-lg shadow-lg">
          <p className="text-[13px] font-medium text-[#a8a29e] dark:text-[#78716c] mb-1">{payload[0].payload.fullDate}</p>
          <p className="text-[15px] font-semibold text-[#1c1917] dark:text-[#f7f4ee] mb-1">
            Mood: {payload[0].payload.rawMood}
          </p>
          <p className="text-[14px] text-[#f97316]">
            ⚡ Energy: {payload[0].payload.energyLevel}/10
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-12">
      <span className="block text-[12px] font-medium tracking-[0.09em] uppercase text-[#a8a29e] dark:text-[#78716c] mb-4">Mood Trends</span>
      <div className="w-full h-[280px] min-w-[200px] bg-white dark:bg-transparent border-[1.5px] border-[#e7e5e0] dark:border-[#44403c] rounded-xl p-4 sm:p-6 pt-8 pb-4 transition-colors duration-200">
        <ResponsiveContainer width="100%" height={230} minWidth={100}>
          <ComposedChart data={chartData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#78716c" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#78716c" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="currentColor" className="stroke-[#e7e5e0] dark:stroke-[#44403c]" opacity={0.6} />
            <XAxis 
              dataKey="id" 
              tickFormatter={(value, index) => chartData[index]?.name}
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#a8a29e' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#a8a29e' }}
              domain={[0, 10]}
              ticks={[0, 5, 10]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(0,0,0,0.05)'}} />
            
            <Bar 
              dataKey="energyLevel" 
              barSize={16} 
              fill="#f97316" 
              radius={[4, 4, 0, 0]} 
            />
            
            <Area 
              className="text-[#1c1917] dark:text-[#f7f4ee]"
              type="monotone" 
              dataKey="moodScore" 
              stroke="currentColor" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorMood)" 
              activeDot={{ r: 6, fill: 'currentColor', stroke: 'currentColor', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-3 justify-end px-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1c1917] dark:bg-[#f7f4ee]"></div>
          <span className="text-[12.5px] text-[#78716c] dark:text-[#a8a29e]">Mood Score</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f97316]"></div>
          <span className="text-[12.5px] text-[#78716c] dark:text-[#a8a29e]">Energy</span>
        </div>
      </div>
    </div>
  );
}

export default MoodChart;
