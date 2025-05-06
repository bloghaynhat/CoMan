import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, FileText, Video } from "lucide-react";

export default function DisplaySectionsAndLessons({ sections, lessons }) {
    return (
        <div className="space-y-6">
            {sections.map((section) => {
                const sectionLessons = lessons.filter(lesson => lesson.section === section.id);
                return (
                    <Card key={section.id} className="border shadow-md">
                        <CardHeader className="bg-purple-100">
                            <CardTitle className="text-purple-700 flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                {section.title}
                                <span className="text-sm bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full ml-2">
                                    {sectionLessons.length} bài học
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="bg-white space-y-2 pt-4">
                            {sectionLessons.length === 0 ? (
                                <p className="text-sm text-gray-500 italic">Chưa có bài học nào.</p>
                            ) : (
                                sectionLessons.map((lesson) => (
                                    <div key={lesson.id} className="border p-3 rounded-md bg-purple-50 hover:bg-purple-100 transition">
                                        <div className="flex items-center gap-2 text-purple-800 font-medium">
                                            <FileText className="w-4 h-4" />
                                            {lesson.title}
                                            {lesson.video_url && (
                                                <span className="ml-auto text-xs bg-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1 text-purple-700">
                                                    <Video className="w-3 h-3" />
                                                    Video
                                                </span>
                                            )}
                                        </div>
                                        {lesson.article_content && (
                                            <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                                                {lesson.article_content}
                                            </p>
                                        )}
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
