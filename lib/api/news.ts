export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  source: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  category: string;
}

export type NewsCategory = 'technology' | 'business' | 'science' | 'health' | 'sports' | 'entertainment' | 'general';

// Mock function simulating API call
export async function getNews(category: NewsCategory = 'general', page: number = 1, pageSize: number = 10): Promise<{
  articles: NewsArticle[],
  totalResults: number
}> {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  
  // Mock news data
  const allArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'New AI breakthrough could revolutionize healthcare',
      description: 'Researchers develop AI system that can detect diseases with unprecedented accuracy',
      content: 'Scientists at a leading research institution have developed a new AI system that can detect various diseases from medical images with accuracy surpassing human doctors. This breakthrough could significantly improve early diagnosis and treatment outcomes.',
      author: 'Jane Smith',
      source: 'Tech Today',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      publishedAt: '2023-06-15T09:00:00Z',
      category: 'technology',
    },
    {
      id: '2',
      title: 'Global stock markets reach all-time high',
      description: 'Major indices show strong gains as investor confidence grows',
      content: 'Global stock markets reached unprecedented heights yesterday as major indices showed strong gains across the board. Analysts attribute this surge to growing investor confidence in economic recovery and positive corporate earnings reports.',
      author: 'John Doe',
      source: 'Financial Times',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      publishedAt: '2023-06-14T14:30:00Z',
      category: 'business',
    },
    {
      id: '3',
      title: 'New vaccine shows promise against multiple variants',
      description: 'Clinical trials report 95% efficacy across all tested variants',
      content: 'A newly developed vaccine has shown remarkable efficacy against multiple variants in recent clinical trials. The vaccine, developed by a collaborative international team, demonstrated 95% protection across all tested variants, potentially offering a more comprehensive solution to evolving public health challenges.',
      author: 'Sarah Johnson',
      source: 'Health Report',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/8830426/pexels-photo-8830426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      publishedAt: '2023-06-13T10:15:00Z',
      category: 'health',
    },
    {
      id: '4',
      title: 'Team USA dominates Olympic swimming events',
      description: 'Americans win six gold medals in a single day',
      content: 'Team USA dominated the Olympic swimming events yesterday, securing an impressive six gold medals in a single day. This remarkable achievement sets a new record for the most gold medals won by a country in swimming events in a single day of Olympic competition.',
      author: 'Mike Thompson',
      source: 'Sports Network',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      publishedAt: '2023-06-12T18:45:00Z',
      category: 'sports',
    },
    {
      id: '5',
      title: 'Astronomers discover Earth-like planet in habitable zone',
      description: 'New exoplanet could potentially support life',
      content: 'Astronomers have discovered a new Earth-like planet orbiting within the habitable zone of its star. Located just 40 light-years away, this exoplanet has similar size and composition to Earth and could potentially support liquid water on its surface, making it a prime candidate in the search for extraterrestrial life.',
      author: 'Alex Chen',
      source: 'Science Daily',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      publishedAt: '2023-06-11T08:20:00Z',
      category: 'science',
    },
    {
      id: '6',
      title: 'Summer blockbuster breaks box office records',
      description: 'New action film surpasses $1 billion in global revenue',
      content: 'The latest summer blockbuster has shattered box office records, surpassing $1 billion in global revenue in just two weeks. The action-packed film, featuring an ensemble cast of A-list actors, has become the fastest movie to reach this milestone, exceeding industry expectations and demonstrating the robust recovery of theater attendance post-pandemic.',
      author: 'Emily Wilson',
      source: 'Entertainment Weekly',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      publishedAt: '2023-06-10T12:00:00Z',
      category: 'entertainment',
    }
  ];
  
  // Filter by category if not 'general'
  let filteredArticles = category === 'general' 
    ? allArticles 
    : allArticles.filter(article => article.category === category);
  
  // Paginate results
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  
  return {
    articles: paginatedArticles,
    totalResults: filteredArticles.length
  };
}