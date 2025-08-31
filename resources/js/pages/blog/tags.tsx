import {AuthenticatedLayout} from "@/layouts"
import {
  MoreHorizontal,
  PlusCircle,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Main } from "@/components/layout"
import { useState } from "react"
import { BlogTag, BlogTagFormData } from "@/types/blog"

const mockTags: BlogTag[] = [
  { id: 1, name: "React", slug: "react", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
  { id: 2, name: "TypeScript", slug: "typescript", created_at: "2024-01-02 00:00:00", updated_at: "2024-01-02 00:00:00" },
  { id: 3, name: "CSS", slug: "css", created_at: "2024-01-03 00:00:00", updated_at: "2024-01-03 00:00:00" },
  { id: 4, name: "JavaScript", slug: "javascript", created_at: "2024-01-04 00:00:00", updated_at: "2024-01-04 00:00:00" },
  { id: 5, name: "Node.js", slug: "nodejs", created_at: "2024-01-05 00:00:00", updated_at: "2024-01-05 00:00:00" },
  { id: 6, name: "Tutorial", slug: "tutorial", created_at: "2024-01-06 00:00:00", updated_at: "2024-01-06 00:00:00" },
  { id: 7, name: "Web Design", slug: "web-design", created_at: "2024-01-07 00:00:00", updated_at: "2024-01-07 00:00:00" },
  { id: 8, name: "Backend", slug: "backend", created_at: "2024-01-08 00:00:00", updated_at: "2024-01-08 00:00:00" },
]

export default function BlogTags() {
  const [tags, setTags] = useState<BlogTag[]>(mockTags)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<BlogTag | null>(null)
  const [formData, setFormData] = useState<BlogTagFormData>({
    name: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateTag = () => {
    const newTag: BlogTag = {
      id: Math.max(...tags.map(t => t.id)) + 1,
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setTags([...tags, newTag])
    setFormData({ name: "" })
    setIsCreateOpen(false)
  }

  const handleEditTag = (tag: BlogTag) => {
    setEditingTag(tag)
    setFormData({ name: tag.name })
    setIsEditOpen(true)
  }

  const handleUpdateTag = () => {
    if (!editingTag) return
    
    const updatedTags = tags.map(tag =>
      tag.id === editingTag.id
        ? {
            ...tag,
            name: formData.name,
            slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
            updated_at: new Date().toISOString(),
          }
        : tag
    )
    setTags(updatedTags)
    setFormData({ name: "" })
    setEditingTag(null)
    setIsEditOpen(false)
  }

  const handleDeleteTag = (tagId: number) => {
    setTags(tags.filter(tag => tag.id !== tagId))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getRandomColor = () => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-yellow-100 text-yellow-800",
      "bg-purple-100 text-purple-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <>
      <AuthenticatedLayout title="Blog Tags">
        <Main>
          <div className="grid flex-1 items-start gap-4 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:max-w-sm">
                <Input
                  placeholder="Search tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-7 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Tag
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Tag</DialogTitle>
                      <DialogDescription>
                        Add a new tag for organizing your blog posts.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="create-name">Name</Label>
                        <Input
                          id="create-name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Tag name"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCreateOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={handleCreateTag}
                        disabled={!formData.name.trim()}
                      >
                        Create Tag
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Tags</CardTitle>
                  <CardDescription>
                    Manage tags for organizing your blog posts. Tags help readers find related content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {filteredTags.slice(0, 20).map((tag) => (
                      <Badge
                        key={tag.id}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                    {filteredTags.length > 20 && (
                      <Badge variant="outline">
                        +{filteredTags.length - 20} more
                      </Badge>
                    )}
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead className="hidden md:table-cell">Created</TableHead>
                        <TableHead className="hidden md:table-cell">Updated</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTags.map((tag) => (
                        <TableRow key={tag.id}>
                          <TableCell className="font-medium">
                            <Badge variant="secondary">{tag.name}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {tag.slug}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(tag.created_at)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(tag.updated_at)}
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
                                <DropdownMenuItem onClick={() => handleEditTag(tag)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteTag(tag.id)}
                                >
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
                    Showing <strong>{filteredTags.length}</strong> of <strong>{tags.length}</strong> tags
                  </div>
                </CardFooter>
              </Card>
            </div>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Tag</DialogTitle>
                  <DialogDescription>
                    Update the tag information.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Tag name"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleUpdateTag}
                    disabled={!formData.name.trim()}
                  >
                    Update Tag
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Main>
      </AuthenticatedLayout>
    </>
  )
}