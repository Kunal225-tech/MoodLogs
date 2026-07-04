const Mood = require('../models/mood');

const chatWithAi = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const cleanMsg = message.trim().toLowerCase();

    if (process.env.GEMINI_API_KEY) {
      try {
        const apiKey = process.env.GEMINI_API_KEY.trim();
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const systemPrompt = `You are Mindful AI, an empathetic, supportive, and compassionate emotional first-aid companion inside a Mood Tracker app. Use Cognitive Behavioral Therapy (CBT) reframing techniques, mindfulness, and gentle validation. Keep responses conversational, warm, and well-structured. Do not act like a generic robot.`;

        let conversationText = `${systemPrompt}\n\n`;
        if (Array.isArray(history) && history.length > 0) {
          history.slice(-6).forEach(item => {
            conversationText += `${item.sender === 'user' ? 'User' : 'Mindful AI'}: ${item.text}\n`;
          });
        }
        conversationText += `User: "${message}"\nMindful AI:`;

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: conversationText }]
              }
            ]
          })
        });

        const data = await response.json();
        if (response.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          return res.status(200).json({
            reply: data.candidates[0].content.parts[0].text,
            source: 'gemini'
          });
        } else {
          console.error('Gemini API returned error or empty content:', JSON.stringify(data, null, 2));
        }
      } catch (err) {
        console.warn('Gemini API call failed or timed out, falling back to heuristic CBT engine:', err.message);
      }
    }

    let reply = '';

    if (cleanMsg.includes('work') || cleanMsg.includes('job') || cleanMsg.includes('boss') || cleanMsg.includes('deadline')) {
      reply = `I hear how much pressure work is putting on you right now. Professional stress often makes us feel like we have to carry everything at once.\n\n✨ **CBT Reframe:** Your productivity does not define your self-worth. When deadlines pile up, our brain magnifies urgency.\n\n🌱 **Quick Action:** Can you pick just *one* small task to complete right now, and give yourself full permission to leave the rest for tomorrow? Take a deep breath—you are doing better than you think.`;
    }
    else if (cleanMsg.includes('stres') || cleanMsg.includes('overwhelm') || cleanMsg.includes('too much') || cleanMsg.includes('anxi') || cleanMsg.includes('worr') || cleanMsg.includes('panic')) {
      reply = `It sounds like your nervous system is carrying quite a bit of tension right now. Feeling stressed or overwhelmed is a natural reaction when demands exceed our perceived resources.\n\n🧘 **Grounding Reframe:** Take a moment to pause. Notice your breathing—is it shallow? Try breathing in slowly for 4 seconds, holding for 4 seconds, and exhaling for 6 seconds.\n\nAsk yourself: *"What is one thing within my immediate control right now?"* Let go of what you cannot solve today. You are safe, and you will get through this step by step.`;
    }
    else if (cleanMsg.includes('sad') || cleanMsg.includes('cry') || cleanMsg.includes('hopeless') || cleanMsg.includes('depres') || cleanMsg.includes('hurt') || cleanMsg.includes('pain')) {
      reply = `Thank you for trusting me with how you feel. It takes real strength to acknowledge when we are feeling low or hurting.\n\n💙 **Validation:** Sadness is not a sign of weakness; it is simply your heart asking for extra kindness, rest, and gentleness right now.\n\nRemember that emotional states are temporary clouds passing through the sky of your awareness. Would you like to write down your heavy thoughts in our **Comfort Sanctuary (` / comfort`)**, or take a few gentle breaths here?`;
    }
    else if (cleanMsg.includes('sleep') || cleanMsg.includes('tir') || cleanMsg.includes('exhaust') || cleanMsg.includes('insomnia') || cleanMsg.includes('fatigu')) {
      reply = `Physical and emotional exhaustion can make even ordinary tasks feel heavy.\n\n🌙 **Recharge Reminder:** Rest is not a reward you must earn—it is a fundamental human necessity. If anxious thoughts are keeping you awake or drained, gently remind yourself: *"I have done what I could for today. The world will keep turning while I rest."*\n\nTry unclenching your jaw, dropping your shoulders away from your ears, and giving your mind permission to unwind.`;
    }
    else if (cleanMsg.includes('ang') || cleanMsg.includes('frustat') || cleanMsg.includes('mad') || cleanMsg.includes('annoy') || cleanMsg.includes('hate')) {
      reply = `It is completely natural to feel frustrated or angry. Anger is often a protective signal indicating that a boundary was crossed or an important expectation wasn't met.\n\n🔥 **Healthy Release:** Notice where you feel this heat in your body. Instead of letting it turn inward, try releasing the tension physically through our Box Breathing exercise in the **Calm Room (` / calm`)** to reset your nervous system before responding.`;
    }
    else if (cleanMsg.includes('lonel') || cleanMsg.includes('alone') || cleanMsg.includes('nobody') || cleanMsg.includes('isolat')) {
      reply = `Loneliness can feel quiet and overwhelming, but feeling disconnected right now does not mean you are truly alone or unlovable.\n\n🌟 **Reframe:** Connection often begins with small steps. Reaching out to even one friend, or simply showing self-compassion right here, is a powerful act of connection. You matter more than your critical thoughts lead you to believe.`;
    }
    else if (cleanMsg.includes('happy') || cleanMsg.includes('good') || cleanMsg.includes('great') || cleanMsg.includes('excit') || cleanMsg.includes('thank') || cleanMsg.includes('better')) {
      reply = `That is wonderful! ✨ Savoring positive moments actively builds emotional resilience in our brain over time.\n\n💡 **Suggestion:** Why not capture this positive energy by dropping a note in your **Gratitude Jar (` / celebrate`)**? Having a record of your joy helps sustain you during tougher days ahead!`;
    }
    else {
      reply = `I am listening closely. Thank you for sharing your experience with me.\n\nRemember that whatever mood or emotion you are feeling right now is completely valid. Our feelings provide important signals, but they do not define our whole reality.\n\nWould you like to explore a calming breathing reframing exercise, talk more about what triggered this feeling, or get actionable tips to organize your thoughts?`;
    }

    await new Promise((resolve) => setTimeout(resolve, 600));

    return res.status(200).json({
      reply,
      source: 'cbt-engine'
    });
  } catch (error) {
    console.error('Error in chatWithAi:', error);
    return res.status(500).json({ error: 'Internal server error while processing AI chat.' });
  }
};

const getMoodInsights = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id || req.user;
    const moods = await Mood.find({ userId }).sort({ date: -1 }).limit(25);

    if (!moods || moods.length === 0) {
      return res.status(200).json({
        summary: "You haven't logged any mood entries yet. Once you track a few days, Mindful AI will uncover your emotional rhythms and triggers.",
        trend: "Getting Started",
        keyTrigger: "Log your daily check-ins along with notes about work, sleep, or social interactions.",
        brightSpot: "Every check-in builds greater self-awareness and emotional resilience.",
        recommendation: "Click  'Add Mood' to capture how you are feeling right now!",
        source: "default"
      });
    }

    if (process.env.GEMINI_API_KEY) {
      try {
        const apiKey = process.env.GEMINI_API_KEY.trim();
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const dataSummary = moods.map(m =>
          `Date: ${new Date(m.date).toLocaleDateString()}, Mood: ${m.mood}, Energy: ${m.energy || 'N/A'}/10, Note: "${m.note || ''}", Tags: [${(m.tags || []).join(', ')}]`
        ).join('\n');

        const prompt = `Analyze the following user mood history (from newest to oldest) and return ONLY a raw JSON object with 5 fields:
1. "summary": A 2-sentence warm, professional summary of their emotional trajectory.
2. "trend": Either "Improving", "Stable", "Fluctuating", or "Reflective".
3. "keyTrigger": One sentence noticing any pattern between lower moods and notes/tags/energy.
4. "brightSpot": One sentence noting positive patterns, high energy, or uplifting entries.
5. "recommendation": One actionable, personalized CBT or mindfulness recommendation.

User Mood Data:
${dataSummary}`;

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        const data = await response.json();
        if (response.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
          return res.status(200).json({ ...parsed, source: 'gemini' });
        }
      } catch (geminiErr) {
        console.warn('Gemini insights failed, falling back to heuristic insights:', geminiErr.message);
      }
    }

    const positiveMoods = moods.filter(m => ['happy', 'excited', 'calm', 'grateful', 'good'].includes(m.mood?.toLowerCase()));
    const negativeMoods = moods.filter(m => ['sad', 'anxious', 'stressed', 'angry', 'overwhelmed'].includes(m.mood?.toLowerCase()));

    let trend = "Stable";
    if (positiveMoods.length > negativeMoods.length * 1.5) trend = "Improving";
    else if (negativeMoods.length > positiveMoods.length) trend = "Fluctuating";

    const allTags = moods.flatMap(m => m.tags || []);
    const topTag = allTags.length > 0 ? allTags[0] : "daily stress";

    return res.status(200).json({
      summary: `Across your last ${moods.length} check-ins, you've maintained an active awareness of your mental well-being with a generally ${trend.toLowerCase()} pattern.`,
      trend,
      keyTrigger: negativeMoods.length > 0 ? `Challenging moments often coincide with lower energy or situations surrounding "${topTag}".` : `You have successfully navigated potential stressors with balanced emotional responses.`,
      brightSpot: positiveMoods.length > 0 ? `You frequently experience uplifting shifts when engaging in self-care and gratitude.` : `Consistently tracking your mood shows strong dedication to mental clarity.`,
      recommendation: `Try stepping outside for a 5-minute mindful walk or visiting our Comfort Sanctuary whenever you notice energy dips.`,
      source: 'heuristic'
    });
  } catch (error) {
    console.error('Error in getMoodInsights:', error);
    return res.status(500).json({ error: 'Failed to generate AI insights.' });
  }
};

module.exports = {
  chatWithAi,
  getMoodInsights
};
