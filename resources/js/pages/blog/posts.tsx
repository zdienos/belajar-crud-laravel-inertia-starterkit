import {AuthenticatedLayout} from "@/layouts"
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Main } from "@/components/layout"
import { useState } from "react"
import { BlogPost, BlogFilters } from "@/types/blog"

const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    slug: "getting-started-react-typescript",
    content: "<p>This is a comprehensive guide...</p>",
    excerpt: "Learn the basics of React with TypeScript",
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
      created_at: "2024-01-01 00:00:00",
      updated_at: "2024-01-01 00:00:00",
    },
    tags: [
      { id: 1, name: "React", slug: "react", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
      { id: 2, name: "TypeScript", slug: "typescript", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
    ],
    author: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "/avatars/01.png",
    },
  },
  {
    id: 2,
    title: "Advanced CSS Techniques for Modern Web Development",
    slug: "advanced-css-techniques",
    content: "<p>Learn advanced CSS techniques...</p>",
    excerpt: "Master modern CSS with these advanced techniques",
    thumbnail: "/placeholder.svg",
    status: "published",
    featured: false,
    published_at: "2024-01-12 14:30:00",
    created_at: "2024-01-11 09:15:00",
    updated_at: "2024-01-12 14:30:00",
    category: {
      id: 2,
      name: "Design",
      slug: "design",
      created_at: "2024-01-01 00:00:00",
      updated_at: "2024-01-01 00:00:00",
    },
    tags: [
      { id: 3, name: "CSS", slug: "css", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
      { id: 4, name: "Web Design", slug: "web-design", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
    ],
    author: {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/avatars/02.png",
    },
  },
  {
    id: 3,
    title: "Building Scalable Node.js Applications",
    slug: "building-scalable-nodejs-applications",
    content: "<p>Learn how to build scalable applications...</p>",
    excerpt: "Best practices for building scalable Node.js apps",
    status: "draft",
    featured: false,
    created_at: "2024-01-10 11:20:00",
    updated_at: "2024-01-10 16:45:00",
    category: {
      id: 3,
      name: "Backend",
      slug: "backend",
      created_at: "2024-01-01 00:00:00",
      updated_at: "2024-01-01 00:00:00",
    },
    tags: [
      { id: 5, name: "Node.js", slug: "nodejs", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
      { id: 6, name: "JavaScript", slug: "javascript", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
    ],
    author: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "/avatars/01.png",
    },
  },
]

export default function BlogPosts() {
  const [filters, setFilters] = useState<BlogFilters>({})
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = mockBlogPosts.filter(post => {
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    if (filters.status && post.status !== filters.status) {
      return false
    }
    if (filters.featured !== undefined && post.featured !== filters.featured) {
      return false
    }
    return true
  })

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <AuthenticatedLayout title="Blog Posts">
        <Main>
          <div className="grid flex-1 items-start gap-4 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                  <TabsTrigger value="archived" className="hidden sm:flex">
                    Archived
                  </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <div className="relative">
                    <Input
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={filters.featured === true}
                        onCheckedChange={(checked) =>
                          setFilters(prev => ({ ...prev, featured: checked ? true : undefined }))
                        }
                      >
                        Featured Only
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={filters.status === "published"}
                        onCheckedChange={(checked) =>
                          setFilters(prev => ({ ...prev, status: checked ? "published" : undefined }))
                        }
                      >
                        Published
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={filters.status === "draft"}
                        onCheckedChange={(checked) =>
                          setFilters(prev => ({ ...prev, status: checked ? "draft" : undefined }))
                        }
                      >
                        Draft
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Export
                    </span>
                  </Button>
                  <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Post
                    </span>
                  </Button>
                </div>
              </div>
              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>
                      Manage your blog posts and view their performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Thumbnail</span>
                          </TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Author
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Published
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                alt="Post thumbnail"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={post.thumbnail || "/placeholder.svg"}
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex flex-col gap-1">
                                <span>{post.title}</span>
                                {post.featured && (
                                  <Badge variant="secondary" className="w-fit text-xs">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {post.category?.name}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(post.status)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex items-center gap-2">
                                <img
                                  alt="Author avatar"
                                  className="rounded-full"
                                  height="24"
                                  src={post.author.avatar || "/placeholder.svg"}
                                  width="24"
                                />
                                <span className="text-sm">{post.author.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {post.published_at ? formatDate(post.published_at) : "Not published"}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>1-{filteredPosts.length}</strong> of <strong>{filteredPosts.length}</strong>{" "}
                      posts
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Main>
      </AuthenticatedLayout>
    </>
  )
}