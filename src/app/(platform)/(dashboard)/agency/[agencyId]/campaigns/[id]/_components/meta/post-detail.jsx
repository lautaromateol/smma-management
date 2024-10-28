import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Facebook, Instagram, ImageIcon } from 'lucide-react'

export function PostDetail({ post, data }) {

    const { igPageName, fbPageName, igPictureUrl, fbPictureUrl } = data

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={post.platform === "FACEBOOK" ? fbPictureUrl : igPictureUrl} alt="@username" />
                        <AvatarFallback>
                            {post.platform === "FACEBOOK" ?
                                fbPageName.trim().split(' ').filter(p => p).slice(0, 2).map(p => p[0].toUpperCase()).join('') :
                                igPageName.trim().split(' ').filter(p => p).slice(0, 2).map(p => p[0].toUpperCase()).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium leading-none">{post.platform === "FACEBOOK" ? fbPageName : `@${igPageName}`}</p>
                        <p className="text-sm text-muted-foreground">Hace 2 horas</p>
                    </div>
                </div>
                <Badge variant="secondary" className="flex items-center space-x-1">
                    {post.platform === "FACEBOOK" ?
                        <>
                            <Facebook className="h-4 w-4" />
                            <span>Facebook</span>
                        </>
                        :
                        <>
                            <Instagram className="h-4 w-4" />
                            <span>Instagram</span>
                        </>
                    }
                </Badge>
            </CardHeader>
            <CardContent>
                <p className="text-base mb-4">
                    {post.message}
                </p>
                {post.urls.length ?
                    <div className="relative h-96 rounded-md overflow-hidden bg-muted">
                        <Image
                            src={post.urls[0].source}
                            alt="Post image preview"
                            className="object-cover w-full h-full"
                            fill
                        />
                    </div>
                    :
                    <div className="flex items-center justify-center bg-muted h-96">
                        <ImageIcon className="size-40 text-neutral-200" />
                    </div>
                }
            </CardContent>
            <CardFooter>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                    </div>
                    <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                    </div>
                    <div className="flex items-center">
                        <Share2 className="h-4 w-4 mr-1" />
                        32
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}