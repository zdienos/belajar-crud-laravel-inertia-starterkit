import {AuthenticatedLayout} from "@/layouts"
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Eye,
  Edit,
  Share2,
} from "lucide-react"

import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Main } from "@/components/layout"
import type { BlogPost } from "@/types/blog"

const mockBlogPost: BlogPost = {
  id: 1,
  title: "Getting Started with React and TypeScript: A Comprehensive Guide",
  slug: "getting-started-react-typescript",
  content: `
    <h2>Introduction</h2>
    <p>React and TypeScript form a powerful combination for building modern web applications. This comprehensive guide will walk you through everything you need to know to get started with these technologies.</p>
    
    <h2>Why React and TypeScript?</h2>
    <p>TypeScript brings static type checking to JavaScript, which helps catch errors during development rather than at runtime. When combined with React, it provides:</p>
    <ul>
      <li>Better IntelliSense and autocomplete</li>
      <li>Catch errors early in development</li>
      <li>Improved code maintainability</li>
      <li>Enhanced developer experience</li>
    </ul>
    
    <h2>Setting Up Your Development Environment</h2>
    <p>To get started, you'll need to set up your development environment. Here's what you'll need:</p>
    <ol>
      <li>Node.js (version 16 or higher)</li>
      <li>A code editor (VS Code recommended)</li>
      <li>Basic knowledge of JavaScript and React</li>
    </ol>
    
    <h2>Creating Your First React TypeScript Project</h2>
    <p>The easiest way to create a new React TypeScript project is using Create React App:</p>
    <pre><code>npx create-react-app my-app --template typescript</code></pre>
    
    <p>This command will set up a new React project with TypeScript configuration out of the box.</p>
    
    <h2>Understanding React Components with TypeScript</h2>
    <p>When writing React components with TypeScript, you'll want to define proper types for your props and state. Here's a basic example:</p>
    
    <pre><code>interface Props {
  title: string;
  count: number;
  onIncrement: () => void;
}

const Counter: React.FC&lt;Props&gt; = ({ title, count, onIncrement }) => {
  return (
    &lt;div&gt;
      &lt;h2&gt;{title}&lt;/h2&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={onIncrement}&gt;Increment&lt;/button&gt;
    &lt;/div&gt;
  );
};</code></pre>
    
    <h2>Best Practices</h2>
    <p>Here are some best practices when working with React and TypeScript:</p>
    <ul>
      <li>Always define interfaces for your component props</li>
      <li>Use strict TypeScript configuration</li>
      <li>Leverage TypeScript's utility types</li>
      <li>Use proper naming conventions</li>
      <li>Keep components small and focused</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>React and TypeScript together provide a robust foundation for building scalable web applications. By following the practices outlined in this guide, you'll be well on your way to creating maintainable and type-safe React applications.</p>
    
    <p>Remember, the key to mastering these technologies is practice. Start with small projects and gradually work your way up to more complex applications.</p>
  `,
  excerpt: "Learn the basics of React with TypeScript in this comprehensive guide that covers everything from setup to best practices.",
  thumbnail: "/placeholder.svg",
  status: "published",
  featured: true,
  published_at: "2024-01-15 10:00:00",
  created_at: "2024-01-14 15:30:00",
  updated_at: "2024-01-15 10:00:00",
  category: {
    id: 1,
    name: "Development",
    slug: "development",
    description: "Web development tutorials and guides",
    created_at: "2024-01-01 00:00:00",
    updated_at: "2024-01-01 00:00:00",
  },
  tags: [
    { id: 1, name: "React", slug: "react", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
    { id: 2, name: "TypeScript", slug: "typescript", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
    { id: 3, name: "Tutorial", slug: "tutorial", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
  ],
  author: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/01.png",
  },
}

export default function BlogPost() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant="outline" className="text-green-600 border-green-600">Published</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "archived":
        return <Badge variant="outline">Archived</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <>
      <AuthenticatedLayout title={mockBlogPost.title}>
        <Main>
          <div className="grid flex-1 items-start gap-4 md:gap-8">
            <div className="grid flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Blog Post
                </h1>
                {getStatusBadge(mockBlogPost.status)}
                {mockBlogPost.featured && (
                  <Badge variant="secondary" className="ml-2">
                    Featured
                  </Badge>
                )}
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Post
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-[1fr_300px] lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4">
                  <Card>
                    <CardHeader>
                      <div className="space-y-4">
                        {mockBlogPost.thumbnail && (
                          <img
                            src={mockBlogPost.thumbnail}
                            alt={mockBlogPost.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <CardTitle className="text-2xl leading-tight">
                            {mockBlogPost.title}
                          </CardTitle>
                          <CardDescription className="mt-2 text-base">
                            {mockBlogPost.excerpt}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: mockBlogPost.content }}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid auto-rows-max items-start gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Post Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <div className="flex items-center gap-2">
                          <img
                            src={mockBlogPost.author.avatar || "/placeholder.svg"}
                            alt={mockBlogPost.author.name}
                            className="w-5 h-5 rounded-full"
                          />
                          <span>{mockBlogPost.author.name}</span>
                        </div>
                      </div>
                      
                      {mockBlogPost.published_at && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Published {formatDate(mockBlogPost.published_at)}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Updated {formatDate(mockBlogPost.updated_at)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {mockBlogPost.category && (
                        <Badge variant="outline" className="text-sm">
                          {mockBlogPost.category.name}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>

                  {mockBlogPost.tags && mockBlogPost.tags.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          Tags
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {mockBlogPost.tags.map((tag) => (
                            <Badge key={tag.id} variant="secondary" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Views</span>
                        <span className="font-medium">1,234</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Likes</span>
                        <span className="font-medium">89</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shares</span>
                        <span className="font-medium">23</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Comments</span>
                        <span className="font-medium">45</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Post
                </Button>
              </div>
            </div>
          </div>
        </Main>
      </AuthenticatedLayout>
    </>
  )
}