import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Zap, Home } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">AI Video Generator</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create stunning marketing videos and virtual property tours using DeepAI's advanced AI video generation capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl">Marketing Video Generator</CardTitle>
              <CardDescription className="text-lg">
                Create compelling marketing videos for Suplimax energy drink with AI-powered customization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Video className="h-4 w-4 mr-2 text-green-500" />
                  Product feature highlighting
                </li>
                <li className="flex items-center">
                  <Video className="h-4 w-4 mr-2 text-green-500" />
                  Customizable tone and style
                </li>
                <li className="flex items-center">
                  <Video className="h-4 w-4 mr-2 text-green-500" />
                  Target audience optimization
                </li>
                <li className="flex items-center">
                  <Video className="h-4 w-4 mr-2 text-green-500" />
                  Download and share options
                </li>
              </ul>
              <Link to="/marketing-video" className="block">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Create Marketing Video</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Real Estate Tour Generator</CardTitle>
              <CardDescription className="text-lg">
                Generate immersive virtual property tours for luxury real estate listings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Video className="h-4 w-4 mr-2 text-green-500" />
                  Virtual property walkthrough
                </li>
                <li className="flex items-center">
                  <Video className="h-4 w-4 mr-2 text-green-500" />
                  Multiple tour styles
                </li>
                <li className="flex items-center">
                  <Video className="h-4 w-4 mr-2 text-green-500" />
                  Luxury presentation focus
                </li>
                <li className="flex items-center">
                  <Video className="h-4 w-4 mr-2 text-green-500" />
                  Professional narration
                </li>
              </ul>
              <Link to="/real-estate" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Create Property Tour</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Powered by DeepAI</h2>
            <p className="text-gray-600">
              Experience cutting-edge AI video creation with DeepAI's advanced text-to-video generation technology for professional marketing and real estate applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 