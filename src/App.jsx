import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Award, Flame, BookOpen, Calendar, TrendingUp, Star } from 'lucide-react';

  const BibleReadingTracker = () => {
  const [readings, setReadings] = useState(() => {
    const saved = localStorage.getItem('bibleReadings');
    return saved ? JSON.parse(saved) : {};
  });
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState(1);

  const readingPlan = [
// Quarter 1
    { day: 1, date: "Jan 1", reading: "Genesis 1-3", quarter: 1 },
    { day: 2, date: "Jan 2", reading: "Genesis 4-7", quarter: 1 },
    { day: 3, date: "Jan 3", reading: "Genesis 8-11", quarter: 1 },
    { day: 4, date: "Jan 4", reading: "Genesis 12-15", quarter: 1 },
    { day: 5, date: "Jan 5", reading: "Genesis 16-18", quarter: 1 },
    { day: 6, date: "Jan 6", reading: "Genesis 19-21", quarter: 1 },
    { day: 7, date: "Jan 7", reading: "Genesis 22-24", quarter: 1 },
    { day: 8, date: "Jan 8", reading: "Genesis 25-26", quarter: 1 },
    { day: 9, date: "Jan 9", reading: "Genesis 27-29", quarter: 1 },
    { day: 10, date: "Jan 10", reading: "Genesis 30-31", quarter: 1 },
    { day: 11, date: "Jan 11", reading: "Genesis 32-34", quarter: 1 },
    { day: 12, date: "Jan 12", reading: "Genesis 35-37", quarter: 1 },
    { day: 13, date: "Jan 13", reading: "Genesis 38-40", quarter: 1 },
    { day: 14, date: "Jan 14", reading: "Genesis 41-42", quarter: 1 },
    { day: 15, date: "Jan 15", reading: "Genesis 43-45", quarter: 1 },
    { day: 16, date: "Jan 16", reading: "Genesis 46-47", quarter: 1 },
    { day: 17, date: "Jan 17", reading: "Genesis 48-50", quarter: 1 },
    { day: 18, date: "Jan 18", reading: "Exodus 1-3", quarter: 1 },
    { day: 19, date: "Jan 19", reading: "Exodus 4-6", quarter: 1 },
    { day: 20, date: "Jan 20", reading: "Exodus 7-9", quarter: 1 },
    { day: 21, date: "Jan 21", reading: "Exodus 10-12", quarter: 1 },
    { day: 22, date: "Jan 22", reading: "Exodus 13-15", quarter: 1 },
    { day: 23, date: "Jan 23", reading: "Exodus 16-18", quarter: 1 },
    { day: 24, date: "Jan 24", reading: "Exodus 19-21", quarter: 1 },
    { day: 25, date: "Jan 25", reading: "Exodus 22-24", quarter: 1 },
    { day: 26, date: "Jan 26", reading: "Exodus 25-27", quarter: 1 },
    { day: 27, date: "Jan 27", reading: "Exodus 28-29", quarter: 1 },
    { day: 28, date: "Jan 28", reading: "Exodus 30-32", quarter: 1 },
    { day: 29, date: "Jan 29", reading: "Exodus 33-35", quarter: 1 },
    { day: 30, date: "Jan 30", reading: "Exodus 36-38", quarter: 1 },
    { day: 31, date: "Jan 31", reading: "Exodus 39-40", quarter: 1 },
    { day: 32, date: "Feb 1", reading: "Leviticus 1-4", quarter: 1 },
    { day: 33, date: "Feb 2", reading: "Leviticus 5-7", quarter: 1 },
    { day: 34, date: "Feb 3", reading: "Leviticus 8-10", quarter: 1 },
    { day: 35, date: "Feb 4", reading: "Leviticus 11-13", quarter: 1 },
    { day: 36, date: "Feb 5", reading: "Leviticus 14-15", quarter: 1 },
    { day: 37, date: "Feb 6", reading: "Leviticus 16-18", quarter: 1 },
    { day: 38, date: "Feb 7", reading: "Leviticus 19-21", quarter: 1 },
    { day: 39, date: "Feb 8", reading: "Leviticus 22-23", quarter: 1 },
    { day: 40, date: "Feb 9", reading: "Leviticus 24-25", quarter: 1 },
    { day: 41, date: "Feb 10", reading: "Leviticus 26-27", quarter: 1 },
    { day: 42, date: "Feb 11", reading: "Numbers 1-2", quarter: 1 },
    { day: 43, date: "Feb 12", reading: "Numbers 3-4", quarter: 1 },
    { day: 44, date: "Feb 13", reading: "Numbers 5-6", quarter: 1 },
    { day: 45, date: "Feb 14", reading: "Numbers 7", quarter: 1 },
    { day: 46, date: "Feb 15", reading: "Leviticus 8-10", quarter: 1 },
    { day: 47, date: "Feb 16", reading: "Leviticus 11-13", quarter: 1 },
    { day: 48, date: "Feb 17", reading: "Leviticus 14-15", quarter: 1 },
    { day: 49, date: "Feb 18", reading: "Leviticus 16-18", quarter: 1 },
    { day: 50, date: "Feb 19", reading: "Leviticus 19-21", quarter: 1 },
    { day: 51, date: "Feb 20", reading: "Leviticus 22-23", quarter: 1 },
    { day: 52, date: "Feb 21", reading: "Leviticus 24-25", quarter: 1 },
    { day: 53, date: "Feb 22", reading: "Leviticus 26-27", quarter: 1 },
    { day: 54, date: "Feb 23", reading: "Numbers 1-2", quarter: 1 },
    { day: 55, date: "Feb 24", reading: "Numbers 3-4", quarter: 1 },
    { day: 56, date: "Feb 25", reading: "Numbers 5-6", quarter: 1 },
    { day: 57, date: "Feb 26", reading: "Numbers 7", quarter: 1 },
    { day: 58, date: "Feb 27", reading: "Numbers 8-10", quarter: 1 },
    { day: 59, date: "Feb 28", reading: "Numbers 11-13", quarter: 1 },
    { day: 60, date: "Mar 1", reading: "Numbers 14-15", quarter: 1 },
    { day: 61, date: "Mar 2", reading: "Numbers 16-17", quarter: 1 },
    { day: 62, date: "Mar 3", reading: "Numbers 18-20", quarter: 1 },
    { day: 63, date: "Mar 4", reading: "Numbers 21-22", quarter: 1 },
    { day: 64, date: "Mar 5", reading: "Numbers 23-25", quarter: 1 },
    { day: 65, date: "Mar 6", reading: "Numbers 26-27", quarter: 1 },
    { day: 66, date: "Mar 7", reading: "Numbers 28-30", quarter: 1 },
    { day: 67, date: "Mar 8", reading: "Numbers 31-32", quarter: 1 },
    { day: 68, date: "Mar 9", reading: "Numbers 33-34", quarter: 1 },
    { day: 69, date: "Mar 10", reading: "Numbers 35-36", quarter: 1 },
    { day: 70, date: "Mar 11", reading: "Deuteronomy 1-2", quarter: 1 },
    { day: 71, date: "Mar 12", reading: "Deuteronomy 3-4", quarter: 1 },
    { day: 72, date: "Mar 13", reading: "Deuteronomy 5-7", quarter: 1 },
    { day: 73, date: "Mar 14", reading: "Deuteronomy 8-10", quarter: 1 },
    { day: 74, date: "Mar 15", reading: "Deuteronomy 11-13", quarter: 1 },
    { day: 75, date: "Mar 16", reading: "Deuteronomy 14-16", quarter: 1 },
    { day: 76, date: "Mar 17", reading: "Deuteronomy 17-20", quarter: 1 },
    { day: 77, date: "Mar 18", reading: "Deuteronomy 21-23", quarter: 1 },
    { day: 78, date: "Mar 19", reading: "Deuteronomy 24-27", quarter: 1 },
    { day: 79, date: "Mar 20", reading: "Deuteronomy 28", quarter: 1 },
    { day: 80, date: "Mar 21", reading: "Deuteronomy 29-31", quarter: 1 },
    { day: 81, date: "Mar 22", reading: "Deuteronomy 32-34", quarter: 1 },
    { day: 82, date: "Mar 23", reading: "Joshua 1-4", quarter: 1 },
    { day: 83, date: "Mar 24", reading: "Joshua 5-8", quarter: 1 },
    { day: 84, date: "Mar 25", reading: "Joshua 9-11", quarter: 1 },
    { day: 85, date: "Mar 26", reading: "Joshua 12-15", quarter: 1 },
    { day: 86, date: "Mar 27", reading: "Joshua 16-18", quarter: 1 },
    { day: 87, date: "Mar 28", reading: "Joshua 19-21", quarter: 1 },
    { day: 88, date: "Mar 29", reading: "Joshua 22-24", quarter: 1 },
    { day: 89, date: "Mar 30", reading: "Judges 1-2", quarter: 1 },
    { day: 90, date: "Mar 31", reading: "Judges 3-5", quarter: 1 },
    
    // Quarter 2
    { day: 91, date: "Apr 1", reading: "Judges 6-7", quarter: 2 },
    { day: 92, date: "Apr 2", reading: "Judges 8-9", quarter: 2 },
    { day: 93, date: "Apr 3", reading: "Judges 10-12", quarter: 2 },
    { day: 94, date: "Apr 4", reading: "Judges 13-15", quarter: 2 },
    { day: 95, date: "Apr 5", reading: "Judges 16-18", quarter: 2 },
    { day: 96, date: "Apr 6", reading: "Judges 19-21", quarter: 2 },
    { day: 97, date: "Apr 7", reading: "Ruth 1-4", quarter: 2 },
    { day: 98, date: "Apr 8", reading: "1 Samuel 1-3", quarter: 2 },
    { day: 99, date: "Apr 9", reading: "1 Samuel 4-8", quarter: 2 },
    { day: 100, date: "Apr 10", reading: "1 Samuel 9-12", quarter: 2 },
    { day: 101, date: "Apr 11", reading: "1 Samuel 13-14", quarter: 2 },
    { day: 102, date: "Apr 12", reading: "1 Samuel 15-17", quarter: 2 },
    { day: 103, date: "Apr 13", reading: "1 Samuel 18-20", quarter: 2 },
    { day: 104, date: "Apr 14", reading: "1 Samuel 21-24", quarter: 2 },
    { day: 105, date: "Apr 15", reading: "1 Samuel 25-27", quarter: 2 },
    { day: 106, date: "Apr 16", reading: "1 Samuel 28-31", quarter: 2 },
    { day: 107, date: "Apr 17", reading: "2 Samuel 1-3", quarter: 2 },
    { day: 108, date: "Apr 18", reading: "2 Samuel 4-7", quarter: 2 },
    { day: 109, date: "Apr 19", reading: "2 Samuel 8-12", quarter: 2 },
    { day: 110, date: "Apr 20", reading: "2 Samuel 13-15", quarter: 2 },
    { day: 111, date: "Apr 21", reading: "2 Samuel 16-18", quarter: 2 },
    { day: 112, date: "Apr 22", reading: "2 Samuel 19-21", quarter: 2 },
    { day: 113, date: "Apr 23", reading: "2 Samuel 22-24", quarter: 2 },
    { day: 114, date: "Apr 24", reading: "1 Kings 1-2", quarter: 2 },
    { day: 115, date: "Apr 25", reading: "1 Kings 3-5", quarter: 2 },
    { day: 116, date: "Apr 26", reading: "1 Kings 6-7", quarter: 2 },
    { day: 117, date: "Apr 27", reading: "1 Kings 8-9", quarter: 2 },
    { day: 118, date: "Apr 28", reading: "1 Kings 10-11", quarter: 2 },
    { day: 119, date: "Apr 29", reading: "1 Kings 12-14", quarter: 2 },
    { day: 120, date: "Apr 30", reading: "1 Kings 15-17", quarter: 2 },
    { day: 121, date: "May 1", reading: "1 Kings 18-20", quarter: 2 },
    { day: 122, date: "May 2", reading: "1 Kings 21-22", quarter: 2 },
    { day: 123, date: "May 3", reading: "2 Kings 1-3", quarter: 2 },
    { day: 124, date: "May 4", reading: "2 Kings 4-5", quarter: 2 },
    { day: 125, date: "May 5", reading: "2 Kings 6-8", quarter: 2 },
    { day: 126, date: "May 6", reading: "2 Kings 9-11", quarter: 2 },
    { day: 127, date: "May 7", reading: "2 Kings 12-14", quarter: 2 },
    { day: 128, date: "May 8", reading: "2 Kings 15-17", quarter: 2 },
    { day: 129, date: "May 9", reading: "2 Kings 18-19", quarter: 2 },
    { day: 130, date: "May 10", reading: "2 Kings 20-22", quarter: 2 },
    { day: 131, date: "May 11", reading: "2 Kings 23-25", quarter: 2 },
    { day: 132, date: "May 12", reading: "1 Chron 1-2", quarter: 2 },
    { day: 133, date: "May 13", reading: "1 Chron 3-5", quarter: 2 },
    { day: 134, date: "May 14", reading: "1 Chron 6-7", quarter: 2 },
    { day: 135, date: "May 15", reading: "2 Kings 9-11", quarter: 2 },
    { day: 136, date: "May 16", reading: "2 Kings 12-14", quarter: 2 },
    { day: 137, date: "May 17", reading: "2 Kings 15-17", quarter: 2 },
    { day: 138, date: "May 18", reading: "2 Kings 18-19", quarter: 2 },
    { day: 139, date: "May 19", reading: "2 Kings 20-22", quarter: 2 },
    { day: 140, date: "May 20", reading: "2 Kings 23-25", quarter: 2 },
    { day: 141, date: "May 21", reading: "1 Chron 1-2", quarter: 2 },
    { day: 142, date: "May 22", reading: "1 Chron 3-5", quarter: 2 },
    { day: 143, date: "May 23", reading: "1 Chron 6-7", quarter: 2 },
    { day: 144, date: "May 24", reading: "1 Chron 8-10", quarter: 2 },
    { day: 145, date: "May 25", reading: "1 Chron 11-13", quarter: 2 },
    { day: 146, date: "May 26", reading: "1 Chron 14-16", quarter: 2 },
    { day: 147, date: "May 27", reading: "1 Chron 17-20", quarter: 2 },
    { day: 148, date: "May 28", reading: "1 Chron 21-23", quarter: 2 },
    { day: 149, date: "May 29", reading: "1 Chron 24-26", quarter: 2 },
    { day: 150, date: "May 30", reading: "1 Chron 27-29", quarter: 2 },
    { day: 151, date: "May 31", reading: "2 Chron 1-3", quarter: 2 },
    { day: 152, date: "Jun 1", reading: "2 Chron 4-6", quarter: 2 },
    { day: 153, date: "Jun 2", reading: "2 Chron 7-9", quarter: 2 },
    { day: 154, date: "Jun 3", reading: "2 Chron 10-13", quarter: 2 },
    { day: 155, date: "Jun 4", reading: "2 Chron 14-16", quarter: 2 },
    { day: 156, date: "Jun 5", reading: "2 Chron 17-20", quarter: 2 },
    { day: 157, date: "Jun 6", reading: "2 Chron 21-24", quarter: 2 },
    { day: 158, date: "Jun 7", reading: "2 Chron 25-27", quarter: 2 },
    { day: 159, date: "Jun 8", reading: "2 Chron 28-31", quarter: 2 },
    { day: 160, date: "Jun 9", reading: "2 Chron 32-34", quarter: 2 },
    { day: 161, date: "Jun 10", reading: "2 Chron 35-36", quarter: 2 },
    { day: 162, date: "Jun 11", reading: "Ezra 1-3", quarter: 2 },
    { day: 163, date: "Jun 12", reading: "Ezra 4-7", quarter: 2 },
    { day: 164, date: "Jun 13", reading: "Ezra 8-10", quarter: 2 },
    { day: 165, date: "Jun 14", reading: "Nehemiah 1-3", quarter: 2 },
    { day: 166, date: "Jun 15", reading: "Nehemiah 4-6", quarter: 2 },
    { day: 167, date: "Jun 16", reading: "Nehemiah 7", quarter: 2 },
    { day: 168, date: "Jun 17", reading: "Nehemiah 8-9", quarter: 2 },
    { day: 169, date: "Jun 18", reading: "Nehemiah 10-11", quarter: 2 },
    { day: 170, date: "Jun 19", reading: "Nehemiah 12-13", quarter: 2 },
    { day: 171, date: "Jun 20", reading: "Esther 1-5", quarter: 2 },
    { day: 172, date: "Jun 21", reading: "Esther 6-10", quarter: 2 },
    { day: 173, date: "Jun 22", reading: "Job 1-4", quarter: 2 },
    { day: 174, date: "Jun 23", reading: "Job 5-8", quarter: 2 },
    { day: 175, date: "Jun 24", reading: "Job 9-12", quarter: 2 },
    { day: 176, date: "Jun 25", reading: "Job 13-16", quarter: 2 },
    { day: 177, date: "Jun 26", reading: "Job 17-20", quarter: 2 },
    { day: 178, date: "Jun 27", reading: "Job 21-24", quarter: 2 },
    { day: 179, date: "Jun 28", reading: "Job 25-30", quarter: 2 },
    { day: 180, date: "Jun 29", reading: "Job 31-34", quarter: 2 },
    { day: 181, date: "Jun 30", reading: "Job 35-42", quarter: 2 },
    
    // Quarter 3
    { day: 182, date: "Jul 1", reading: "Psalms 1-8", quarter: 3 },
    { day: 183, date: "Jul 2", reading: "Psalms 9-16", quarter: 3 },
    { day: 184, date: "Jul 3", reading: "Psalms 17-20", quarter: 3 },
    { day: 185, date: "Jul 4", reading: "Psalms 21-25", quarter: 3 },
    { day: 186, date: "Jul 5", reading: "Psalms 26-31", quarter: 3 },
    { day: 187, date: "Jul 6", reading: "Psalms 32-35", quarter: 3 },
    { day: 188, date: "Jul 7", reading: "Psalms 36-39", quarter: 3 },
    { day: 189, date: "Jul 8", reading: "Psalms 40-45", quarter: 3 },
    { day: 190, date: "Jul 9", reading: "Psalms 46-51", quarter: 3 },
    { day: 191, date: "Jul 10", reading: "Psalms 52-59", quarter: 3 },
    { day: 192, date: "Jul 11", reading: "Psalms 60-66", quarter: 3 },
    { day: 193, date: "Jul 12", reading: "Psalms 67-71", quarter: 3 },
    { day: 194, date: "Jul 13", reading: "Psalms 72-77", quarter: 3 },
    { day: 195, date: "Jul 14", reading: "Psalms 78-79", quarter: 3 },
    { day: 196, date: "Jul 15", reading: "Psalms 80-85", quarter: 3 },
    { day: 197, date: "Jul 16", reading: "Psalms 86-89", quarter: 3 },
    { day: 198, date: "Jul 17", reading: "Psalms 90-95", quarter: 3 },
    { day: 199, date: "Jul 18", reading: "Psalms 96-102", quarter: 3 },
    { day: 200, date: "Jul 19", reading: "Psalms 103-105", quarter: 3 },
    { day: 201, date: "Jul 20", reading: "Psalms 106-107", quarter: 3 },
    { day: 202, date: "Jul 21", reading: "Psalms 108-114", quarter: 3 },
    { day: 203, date: "Jul 22", reading: "Psalms 115-118", quarter: 3 },
    { day: 204, date: "Jul 23", reading: "Ps 119:1-88", quarter: 3 },
    { day: 205, date: "Jul 24", reading: "Ps 119:89-176", quarter: 3 },
    { day: 206, date: "Jul 25", reading: "Psalms 120-132", quarter: 3 },
    { day: 207, date: "Jul 26", reading: "Psalms 133-139", quarter: 3 },
    { day: 208, date: "Jul 27", reading: "Psalms 140-145", quarter: 3 },
    { day: 209, date: "Jul 28", reading: "Psalms 146-150", quarter: 3 },
    { day: 210, date: "Jul 29", reading: "Proverbs 1-3", quarter: 3 },
    { day: 211, date: "Jul 30", reading: "Proverbs 4-7", quarter: 3 },
    { day: 212, date: "Jul 31", reading: "Proverbs 8-11", quarter: 3 },
    { day: 213, date: "Aug 1", reading: "Proverbs 12-14", quarter: 3 },
    { day: 214, date: "Aug 2", reading: "Proverbs 15-18", quarter: 3 },
    { day: 215, date: "Aug 3", reading: "Proverbs 19-22", quarter: 3 },
    { day: 216, date: "Aug 4", reading: "Proverbs 23-25", quarter: 3 },
    { day: 217, date: "Aug 5", reading: "Proverbs 26-29", quarter: 3 },
    { day: 218, date: "Aug 6", reading: "Proverbs 30-31", quarter: 3 },
    { day: 219, date: "Aug 7", reading: "Ecclesiastes 1-4", quarter: 3 },
    { day: 220, date: "Aug 8", reading: "Ecclesiastes 5-8", quarter: 3 },
    { day: 221, date: "Aug 9", reading: "Ecclesiastes 9-12", quarter: 3 },
    { day: 222, date: "Aug 10", reading: "Song of Sol 1-4", quarter: 3 },
    { day: 223, date: "Aug 11", reading: "Song of Sol 5-8", quarter: 3 },
    { day: 224, date: "Aug 12", reading: "Isaiah 1-2", quarter: 3 },
    { day: 225, date: "Aug 13", reading: "Isaiah 3-4", quarter: 3 },
    { day: 226, date: "Aug 14", reading: "Isaiah 5-6", quarter: 3 },
    { day: 227, date: "Aug 15", reading: "Isaiah 5-6 (Buffer)", quarter: 3 },
    { day: 228, date: "Aug 16", reading: "Isaiah 7-10", quarter: 3 },
    { day: 229, date: "Aug 17", reading: "Isaiah 11-14", quarter: 3 },
    { day: 230, date: "Aug 18", reading: "Isaiah 15-19", quarter: 3 },
    { day: 231, date: "Aug 19", reading: "Isaiah 20-24", quarter: 3 },
    { day: 232, date: "Aug 20", reading: "Isaiah 25-28", quarter: 3 },
    { day: 233, date: "Aug 21", reading: "Isaiah 29-31", quarter: 3 },
    { day: 234, date: "Aug 22", reading: "Isaiah 32-35", quarter: 3 },
    { day: 235, date: "Aug 23", reading: "Isaiah 36-37", quarter: 3 },
    { day: 236, date: "Aug 24", reading: "Isaiah 38-41", quarter: 3 },
    { day: 237, date: "Aug 25", reading: "Isaiah 42-44", quarter: 3 },
    { day: 238, date: "Aug 26", reading: "Isaiah 45-48", quarter: 3 },
    { day: 239, date: "Aug 27", reading: "Isaiah 49-51", quarter: 3 },
    { day: 240, date: "Aug 28", reading: "Isaiah 52-57", quarter: 3 },
    { day: 241, date: "Aug 29", reading: "Isaiah 58-62", quarter: 3 },
    { day: 242, date: "Aug 30", reading: "Isaiah 63-66", quarter: 3 },
    { day: 243, date: "Aug 31", reading: "Jeremiah 1-3", quarter: 3 },
    { day: 244, date: "Sep 1", reading: "Jeremiah 4-6", quarter: 3 },
    { day: 245, date: "Sep 2", reading: "Jeremiah 7-9", quarter: 3 },
    { day: 246, date: "Sep 3", reading: "Jeremiah 10-13", quarter: 3 }, 
    { day: 247, date: "Sep 4", reading: "Jeremiah 14-17", quarter: 3 },
    { day: 248, date: "Sep 5", reading: "Jeremiah 18-22", quarter: 3 },
    { day: 249, date: "Sep 6", reading: "Jeremiah 23-25", quarter: 3 },
    { day: 250, date: "Sep 7", reading: "Jeremiah 26-29", quarter: 3 },
    { day: 251, date: "Sep 8", reading: "Jeremiah 30-32", quarter: 3 },
    { day: 252, date: "Sep 9", reading: "Jeremiah 33-36", quarter: 3 },
    { day: 253, date: "Sep 10", reading: "Jeremiah 37-39", quarter: 3 },
    { day: 254, date: "Sep 11", reading: "Jeremiah 40-44", quarter: 3 },
    { day: 255, date: "Sep 12", reading: "Jeremiah 45-48", quarter: 3 },
    { day: 256, date: "Sep 13", reading: "Jeremiah 49-50", quarter: 3 },
    { day: 257, date: "Sep 14", reading: "Jeremiah 51-52", quarter: 3 },
    { day: 258, date: "Sep 15", reading: "Lamentations 1-2", quarter: 3 },
    { day: 259, date: "Sep 16", reading: "Lamentations 3-5", quarter: 3 },
    { day: 260, date: "Sep 17", reading: "Ezekiel 1-4", quarter: 3 },
    { day: 261, date: "Sep 18", reading: "Ezekiel 5-8", quarter: 3 },
    { day: 262, date: "Sep 19", reading: "Ezekiel 9-12", quarter: 3 },
    { day: 263, date: "Sep 20", reading: "Ezekiel 13-15", quarter: 3 },
    { day: 264, date: "Sep 21", reading: "Ezekiel 16", quarter: 3 },
    { day: 265, date: "Sep 22", reading: "Ezekiel 17-19", quarter: 3 },
    { day: 266, date: "Sep 23", reading: "Ezekiel 20-21", quarter: 3 },
    { day: 267, date: "Sep 24", reading: "Ezekiel 22-23", quarter: 3 },
    { day: 268, date: "Sep 25", reading: "Ezekiel 24-27", quarter: 3 },
    { day: 269, date: "Sep 26", reading: "Ezekiel 28-30", quarter: 3 },
    { day: 270, date: "Sep 27", reading: "Ezekiel 31-33", quarter: 3 },
    { day: 271, date: "Sep 28", reading: "Ezekiel 34-36", quarter: 3 },
    { day: 272, date: "Sep 29", reading: "Ezekiel 37-39", quarter: 3 },
    { day: 273, date: "Sep 30", reading: "Ezekiel 40-42", quarter: 3 },
    
    // Quarter 4
    { day: 274, date: "Oct 1", reading: "Ezekiel 43-45", quarter: 4 },
    { day: 275, date: "Oct 2", reading: "Ezekiel 46-48", quarter: 4 },
    { day: 276, date: "Oct 3", reading: "Daniel 1-3", quarter: 4 },
    { day: 277, date: "Oct 4", reading: "Daniel 4-6", quarter: 4 },
    { day: 278, date: "Oct 5", reading: "Daniel 7-9", quarter: 4 },
    { day: 279, date: "Oct 6", reading: "Daniel 10-12", quarter: 4 },
    { day: 280, date: "Oct 7", reading: "Hosea 1-7", quarter: 4 },
    { day: 281, date: "Oct 8", reading: "Hosea 8-14", quarter: 4 },
    { day: 282, date: "Oct 9", reading: "Joel 1-3", quarter: 4 },
    { day: 283, date: "Oct 10", reading: "Amos 1-5", quarter: 4 },
    { day: 284, date: "Oct 11", reading: "Amos 6-9", quarter: 4 },
    { day: 285, date: "Oct 12", reading: "Obadiah - Jonah", quarter: 4 },
    { day: 286, date: "Oct 13", reading: "Micah 1-7", quarter: 4 },
    { day: 287, date: "Oct 14", reading: "Nahum 1-3", quarter: 4 },
    { day: 288, date: "Oct 15", reading: "Habakkuk - Zeph", quarter: 4 },
    { day: 289, date: "Oct 16", reading: "Haggai 1-2", quarter: 4 },
    { day: 290, date: "Oct 17", reading: "Zechariah 1-7", quarter: 4 },
    { day: 291, date: "Oct 18", reading: "Zechariah 8-14", quarter: 4 },
    { day: 292, date: "Oct 19", reading: "Malachi 1-4", quarter: 4 },
    { day: 293, date: "Oct 20", reading: "Matthew 1-4", quarter: 4 },
    { day: 294, date: "Oct 21", reading: "Matthew 5-7", quarter: 4 },
    { day: 295, date: "Oct 22", reading: "Matthew 8-10", quarter: 4 },
    { day: 296, date: "Oct 23", reading: "Matthew 11-13", quarter: 4 },
    { day: 297, date: "Oct 24", reading: "Matthew 14-16", quarter: 4 },
    { day: 298, date: "Oct 25", reading: "Matthew 17-20", quarter: 4 },
    { day: 299, date: "Oct 26", reading: "Matthew 21-23", quarter: 4 },
    { day: 300, date: "Oct 27", reading: "Matthew 24-25", quarter: 4 },
    { day: 301, date: "Oct 28", reading: "Matthew 26-28", quarter: 4 },
    { day: 302, date: "Oct 29", reading: "Mark 1-3", quarter: 4 },
    { day: 303, date: "Oct 30", reading: "Mark 4-7", quarter: 4 },
    { day: 304, date: "Oct 31", reading: "Mark 8-10", quarter: 4 },
    { day: 305, date: "Nov 1", reading: "Mark 11-13", quarter: 4 },
    { day: 306, date: "Nov 2", reading: "Mark 14-16", quarter: 4 },
    { day: 307, date: "Nov 3", reading: "Luke 1-2", quarter: 4 },
    { day: 308, date: "Nov 4", reading: "Luke 3-5", quarter: 4 },
    { day: 309, date: "Nov 5", reading: "Luke 6-8", quarter: 4 },
    { day: 310, date: "Nov 6", reading: "Luke 9-10", quarter: 4 },
    { day: 311, date: "Nov 7", reading: "Luke 11-12", quarter: 4 },
    { day: 312, date: "Nov 8", reading: "Luke 13-16", quarter: 4 },
    { day: 313, date: "Nov 9", reading: "Luke 17-19", quarter: 4 },
    { day: 314, date: "Nov 10", reading: "Luke 20-21", quarter: 4 },
    { day: 315, date: "Nov 11", reading: "Luke 22-24", quarter: 4 },
    { day: 316, date: "Nov 12", reading: "John 1-4", quarter: 4 },
    { day: 317, date: "Nov 13", reading: "John 5-8", quarter: 4 },
    { day: 318, date: "Nov 14", reading: "John 9-12", quarter: 4 },
    { day: 319, date: "Nov 15", reading: "John 13-21", quarter: 4 },
    { day: 320, date: "Nov 16", reading: "Acts 15-16", quarter: 4 },
    { day: 321, date: "Nov 17", reading: "Acts 17-18", quarter: 4 },
    { day: 322, date: "Nov 18", reading: "Acts 19-20", quarter: 4 },
    { day: 323, date: "Nov 19", reading: "Acts 21-23", quarter: 4 },
    { day: 324, date: "Nov 20", reading: "Acts 24-26", quarter: 4 },
    { day: 325, date: "Nov 21", reading: "Acts 27-28", quarter: 4 },
    { day: 326, date: "Nov 22", reading: "Romans 1-3", quarter: 4 },
    { day: 327, date: "Nov 23", reading: "Romans 4-7", quarter: 4 },
    { day: 328, date: "Nov 24", reading: "Romans 8-10", quarter: 4 },
    { day: 329, date: "Nov 25", reading: "Romans 11-13", quarter: 4 },
    { day: 330, date: "Nov 26", reading: "Romans 14-16", quarter: 4 },
    { day: 331, date: "Nov 27", reading: "1 Corinthians 1-4", quarter: 4 },
    { day: 332, date: "Nov 28", reading: "1 Corinthians 5-8", quarter: 4 },
    { day: 333, date: "Nov 29", reading: "1 Corinthians 9-11", quarter: 4 },
    { day: 334, date: "Nov 30", reading: "1 Corinthians 12-14", quarter: 4 },
    { day: 335, date: "Dec 1", reading: "1 Corinthians 15-16", quarter: 4 },
    { day: 336, date: "Dec 2", reading: "2 Corinthians 1-4", quarter: 4 },
    { day: 337, date: "Dec 3", reading: "2 Corinthians 5-9", quarter: 4 },
    { day: 338, date: "Dec 4", reading: "2 Corinthians 10-13", quarter: 4 },
    { day: 339, date: "Dec 5", reading: "Galatians 1-3", quarter: 4 },
    { day: 340, date: "Dec 6", reading: "Galatians 4-6", quarter: 4 },
    { day: 341, date: "Dec 7", reading: "Ephesians 1-3", quarter: 4 },
    { day: 342, date: "Dec 8", reading: "Ephesians 4-6", quarter: 4 },
    { day: 343, date: "Dec 9", reading: "Philippians 1-4", quarter: 4 },
    { day: 344, date: "Dec 10", reading: "Colossians 1-4", quarter: 4 },
    { day: 345, date: "Dec 11", reading: "1 Thess 1-5", quarter: 4 },
    { day: 346, date: "Dec 12", reading: "2 Thess 1-3", quarter: 4 },
    { day: 347, date: "Dec 13", reading: "1 Timothy 1-6", quarter: 4 },
    { day: 348, date: "Dec 14", reading: "2 Tim & Titus", quarter: 4 },
    { day: 349, date: "Dec 15", reading: "Philemon & Heb 1-4", quarter: 4 },
    { day: 350, date: "Dec 16", reading: "Hebrews 5-9", quarter: 4 },
    { day: 351, date: "Dec 17", reading: "Hebrews 10-13", quarter: 4 },
    { day: 352, date: "Dec 18", reading: "James 1-5", quarter: 4 },
    { day: 353, date: "Dec 19", reading: "1 Peter 1-5", quarter: 4 },
    { day: 354, date: "Dec 20", reading: "2 Peter 1-3", quarter: 4 },
    { day: 355, date: "Dec 21", reading: "1 John 1-5", quarter: 4 },
    { day: 356, date: "Dec 22", reading: "2 John, 3 John, Jude", quarter: 4 },
    { day: 357, date: "Dec 23", reading: "Revelation 1-3", quarter: 4 },
    { day: 358, date: "Dec 24", reading: "Revelation 4-6", quarter: 4 },
    { day: 359, date: "Dec 25", reading: "Revelation 7-9", quarter: 4 },
    { day: 360, date: "Dec 26", reading: "Revelation 10-12", quarter: 4 },
    { day: 361, date: "Dec 27", reading: "Revelation 13-15", quarter: 4 },
    { day: 362, date: "Dec 28", reading: "Revelation 16-17", quarter: 4 },
    { day: 363, date: "Dec 29", reading: "Revelation 18-19", quarter: 4 },
    { day: 364, date: "Dec 30", reading: "Revelation 20-21", quarter: 4 },
    { day: 365, date: "Dec 31", reading: "Revelation 22", quarter: 4 }
  ];

  const celebrationMessages = [
    "Amazing work! 🎉",
    "You're on fire! 🔥",
    "Keep it up! ⭐",
    "God's Word is alive! 📖",
    "Well done! 💪",
    "You're building a great habit! 🌟",
    "Faithful and consistent! 🙏",
    "Another day closer! 🎯",
    "You're doing great! ✨",
    "Stay strong! 💫"
  ];

  useEffect(() => {
    calculateStreak();
  }, [readings]);

  const calculateStreak = () => {
    const sortedDays = Object.keys(readings)
      .filter(day => readings[day])
      .map(Number)
      .sort((a, b) => a - b);

    let current = 0;
    let longest = 0;
    let tempStreak = 0;

    for (let i = 0; i < sortedDays.length; i++) {
      if (i === 0 || sortedDays[i] === sortedDays[i - 1] + 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
      
      if (i === sortedDays.length - 1) {
        current = tempStreak;
      }
      longest = Math.max(longest, tempStreak);
    }

    setCurrentStreak(current);
    setLongestStreak(longest);
  };

  const toggleReading = (day) => {
    const newReadings = { ...readings, [day]: !readings[day] };
    setReadings(newReadings);

    if (!readings[day]) {
      const randomMessage = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
      setCelebrationMessage(randomMessage);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };
  useEffect(() => {
  localStorage.setItem('bibleReadings', JSON.stringify(readings));
}, [readings]);
  

  const totalRead = Object.values(readings).filter(Boolean).length;
  const progressPercent = (totalRead / 365) * 100;
  const quarterReadings = readingPlan.filter(r => r.quarter === selectedQuarter);
  const quarterComplete = quarterReadings.filter(r => readings[r.day]).length;
  const quarterPercent = (quarterComplete / quarterReadings.length) * 100;

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Bible Reading 2026
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Your journey through God's Word</p>
        </div>

        {showCelebration && (
          <div className="fixed top-4 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce px-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl text-base sm:text-xl font-bold">
              {celebrationMessage}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={20} />
              <span className="text-base sm:text-lg font-semibold text-gray-700">Overall Progress</span>
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {totalRead}/365
            </span>
          </div>
          
          <div className="relative w-full h-6 sm:h-8 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs sm:text-sm font-bold text-white drop-shadow-lg">
                {progressPercent.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Flame size={24} className="sm:w-8 sm:h-8" />
              <span className="text-sm sm:text-lg font-semibold">Current Streak</span>
            </div>
            <p className="text-3xl sm:text-4xl font-bold">{currentStreak} days</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Award size={24} className="sm:w-8 sm:h-8" />
              <span className="text-sm sm:text-lg font-semibold">Longest Streak</span>
            </div>
            <p className="text-3xl sm:text-4xl font-bold">{longestStreak} days</p>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <BookOpen size={24} className="sm:w-8 sm:h-8" />
              <span className="text-sm sm:text-lg font-semibold">Days Remaining</span>
            </div>
            <p className="text-3xl sm:text-4xl font-bold">{365 - totalRead} days</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Reading Plan</h2>
            <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              {[1, 2, 3, 4].map(q => (
                <button
                  key={q}
                  onClick={() => setSelectedQuarter(q)}
                  className={`px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl font-semibold transition-all whitespace-nowrap ${
                    selectedQuarter === q
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  Q{q}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-semibold text-gray-600">Quarter {selectedQuarter} Progress</span>
              <span className="text-xs sm:text-sm font-bold text-purple-600">{quarterComplete}/{quarterReadings.length}</span>
            </div>
            <div className="w-full h-2.5 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${quarterPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto pr-1 sm:pr-2">
            {quarterReadings.map((item) => (
              <div
                key={item.day}
                onClick={() => toggleReading(item.day)}
                className={`cursor-pointer p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 transform active:scale-95 sm:hover:scale-105 ${
                  readings[item.day]
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <Calendar size={14} className={`flex-shrink-0 sm:w-4 sm:h-4 ${readings[item.day] ? 'text-white' : 'text-gray-500'}`} />
                      <span className={`text-xs sm:text-sm font-semibold truncate ${readings[item.day] ? 'text-white' : 'text-gray-600'}`}>
                        Day {item.day} - {item.date}
                      </span>
                    </div>
                    <p className={`text-xs sm:text-sm font-medium ${readings[item.day] ? 'text-white' : 'text-gray-700'}`}>
                      {item.reading}
                    </p>
                  </div>
                  <div className="ml-2 sm:ml-3 flex-shrink-0">
                    {readings[item.day] ? (
                      <CheckCircle2 className="text-white" size={24} />
                    ) : (
                      <Circle className="text-gray-400" size={24} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalRead === 365 && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-12 text-center">
            <Star className="mx-auto mb-3 sm:mb-4 text-white" size={48} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">🎉 Congratulations! 🎉</h2>
            <p className="text-lg sm:text-xl text-white">You've completed the entire Bible in 2026!</p>
            <p className="text-base sm:text-lg text-white mt-2">What an incredible journey through God's Word!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibleReadingTracker;
