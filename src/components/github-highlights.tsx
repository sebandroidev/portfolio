"use client";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface GitHubStats {
  followers: number;
  following: number;
}

export function GitHubHighlights() {
  const t = useTranslations();
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch GitHub stats with better error handling and timeout
    const fetchGitHubStats = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch('https://api.github.com/users/sebandroidev', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`GitHub API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        setStats({
          followers: data.followers || 19,
          following: data.following || 12
        });
      } catch (error) {
        console.warn('GitHub API unavailable, using fallback data:', error);
        // Fallback to static data when API fails
        setStats({
          followers: 19,
          following: 12
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  const achievements = [
    {
      name: "Pull Shark",
      description: "Opened multiple pull requests",
      icon: "/pull-shark.png",
      count: 2
    },
    {
      name: "YOLO",
      description: "Merged a pull request without code review",
      icon: "/yolo.png",
      count: 1
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Icons.github className="size-5" />
          GitHub Highlights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {loading ? "..." : stats?.followers}
            </div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {loading ? "..." : stats?.following}
            </div>
            <div className="text-sm text-muted-foreground">Following</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-2">
                <Image 
                  src={achievement.icon} 
                  alt={achievement.name}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
                <span>{achievement.name}</span>
                {achievement.count > 1 && (
                  <span className="text-xs">x{achievement.count}</span>
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bio Highlight */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Currently Working On</h4>
          <div className="space-y-2">
            <p className="text-sm">
              💻 <strong>Trendz</strong> - Digital event booking platform
            </p>
            <p className="text-sm">
              📚 <strong>Mellow</strong> - Modern API documentation alternative to Swagger
            </p>
            <p className="text-sm">
              🏢 <strong>Orly</strong> - Local business directory with geolocation and review system
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            📱 Senior Flutter Engineer with 5+ years of experience in mobile application development
          </p>
        </div>

        {/* CTA */}
        <Link 
          href="https://github.com/sebandroidev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
            <Icons.github className="size-4" />
            <span className="text-sm font-medium">View GitHub Profile</span>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}