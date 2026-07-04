

import React from 'react'
import axios from 'axios'
import AddMood from './AddMood'
import MoodCard from './MoodCard'
import MoodChart from './MoodChart'
import AiInsightsCard from './AiInsightsCard'
import API_BASE_URL from '../api'

function ListMood() {
  const [moods, setMoods] = React.useState([]);

  const fetchMoods = async (e) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/mood/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMoods(res.data);
    } catch (err) {
      alert("Failed to fetch moods!!");
    }
  }

  React.useEffect(() => {
    fetchMoods();
  }, [])

  const calculateStreak = () => {
    if (!moods || moods.length === 0) {
      localStorage.setItem('dailyStreak', 0);
      window.dispatchEvent(new Event('streakUpdated'));
      return 0;
    }

    const toLocalDateString = (date) => {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const uniqueDates = [...new Set(moods.map(m => toLocalDateString(m.date)))];

    const today = new Date();
    const todayStr = toLocalDateString(today);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = toLocalDateString(yesterday);

    let hasLoggedToday = uniqueDates.includes(todayStr);
    let hasLoggedYesterday = uniqueDates.includes(yesterdayStr);

    if (!hasLoggedToday && !hasLoggedYesterday) {
      return 0;
    }

    let streak = 0;
    let currentDate = new Date();

    if (!hasLoggedToday && hasLoggedYesterday) {
      currentDate.setDate(currentDate.getDate() - 1);    }

    while (true) {
      const dateStringToCheck = toLocalDateString(currentDate);
      if (uniqueDates.includes(dateStringToCheck)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);      } else {
        break;      }
    }

    localStorage.setItem('dailyStreak', streak);
    window.dispatchEvent(new Event('streakUpdated'));

    return streak;
  };

  React.useEffect(() => {
    calculateStreak();
  }, [moods]);

  const hasLoggedToday = moods.some(m => {
    const todayStr = new Date().toISOString().split('T')[0];
    const logStr = new Date(m.date).toISOString().split('T')[0];
    return todayStr === logStr;
  });

  return (
    <div className="font-sans w-full">
      {}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full items-start">
        
        {}
        <div className="flex-1 lg:w-[58%] min-w-0 space-y-8">
          <div>
            <span className="block text-[12px] font-medium tracking-[0.09em] uppercase text-[#a8a29e] dark:text-[#78716c] mb-4">Log a mood</span>
            <AddMood refresh={fetchMoods} />
          </div>

          {}
          <div className="pt-2">
            <span className="block text-[12px] font-medium tracking-[0.09em] uppercase text-[#a8a29e] dark:text-[#78716c] mb-4">Past entries</span>

            {moods.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-[#e7e5e0] dark:border-[#292524] rounded-2xl">
                <p className="font-serif text-[20px] italic text-[#a8a29e] dark:text-[#78716c] mb-1">Nothing logged yet.</p>
                <p className="text-[13px] text-[#c4bfbb] dark:text-[#57534e]">Your entries will appear right here once you log your first mood.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {moods.map((m) => (
                  <MoodCard key={m._id} mood={m} refresh={fetchMoods} />
                ))}
              </div>
            )}
          </div>
        </div>

        {}
        <div className="w-full lg:w-[42%] shrink-0 relative min-w-0">
          <div className="sticky top-28 space-y-4">
            <MoodChart moods={moods} />
            <AiInsightsCard moods={moods} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default ListMood