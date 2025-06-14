"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Download, Play, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { generateMarketingVideo, validateMarketingParams } from "@/services/marketingVideoService";
import { useToast } from "@/hooks/use-toast";

export default function MarketingVideoPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    productFeatures: [],
    videoTone: "",
    targetAudience: "",
    videoStyle: "",
    videoDuration: "15 seconds",
    additionalNotes: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);
  const [validation, setValidation] = useState(null);

  const productFeatureOptions = [
    "High caffeine content (200mg)",
    "Natural ingredients",
    "Zero sugar formula",
    "Enhanced with vitamins",
    "Tropical fruit flavor",
    "Sustained energy release",
    "Pre-workout optimization",
    "Electrolyte balance"
  ];

  const handleFeatureChange = (feature, checked) => {
    setFormData(prev => ({
      ...prev,
      productFeatures: checked 
        ? [...prev.productFeatures, feature] 
        : prev.productFeatures.filter(f => f !== feature)
    }));
  };

  const validateForm = async () => {
    try {
      const response = await validateMarketingParams(formData);
      setValidation(response);
      return response.valid;
    } catch (err) {
      toast({
        title: "Validation Error",
        description: err.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const handleGenerate = async () => {
    setError(null);
    setValidation(null);
    
    const isValid = await validateForm();
    if (!isValid) {
      setError("Please fix validation issues");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await generateMarketingVideo(formData);
      setGeneratedContent(response.data);
      toast({
        title: "Success",
        description: response.message
      });
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedContent?.videoUrl) return;
    const link = document.createElement('a');
    link.href = generatedContent.videoUrl;
    link.download = 'suplimax-marketing-video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Suplimax Marketing Video Generator</h1>
          <p className="text-lg text-gray-600">Create compelling marketing videos for Suplimax energy drink using AI</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Video Configuration</CardTitle>
              <CardDescription>Customize your Suplimax marketing video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">Product Features *</Label>
                <div className="grid grid-cols-1 gap-3">
                  {productFeatureOptions.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={formData.productFeatures.includes(feature)}
                        onCheckedChange={(checked) => handleFeatureChange(feature, checked)}
                      />
                      <Label htmlFor={feature} className="text-sm">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
                {validation?.validationResults?.productFeatures && !validation.validationResults.productFeatures.valid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validation.validationResults.productFeatures.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="videoTone">Video Tone *</Label>
                <Select
                  value={formData.videoTone}
                  onValueChange={value => setFormData(prev => ({ ...prev, videoTone: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="energetic">Energetic</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="fun">Fun</SelectItem>
                    <SelectItem value="intense">Intense</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
                {validation?.validationResults?.videoTone && !validation.validationResults.videoTone.valid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validation.validationResults.videoTone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience *</Label>
                <Select
                  value={formData.targetAudience}
                  onValueChange={value => setFormData(prev => ({ ...prev, targetAudience: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="athletes">Athletes</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="gamers">Gamers</SelectItem>
                    <SelectItem value="general">General Consumers</SelectItem>
                    <SelectItem value="health-conscious">Health-Conscious</SelectItem>
                  </SelectContent>
                </Select>
                {validation?.validationResults?.targetAudience && !validation.validationResults.targetAudience.valid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validation.validationResults.targetAudience.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="videoStyle">Video Style *</Label>
                <Select
                  value={formData.videoStyle}
                  onValueChange={value => setFormData(prev => ({ ...prev, videoStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cinematic">Cinematic</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="documentary">Documentary</SelectItem>
                    <SelectItem value="animated">Animated</SelectItem>
                  </SelectContent>
                </Select>
                {validation?.validationResults?.videoStyle && !validation.validationResults.videoStyle.valid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validation.validationResults.videoStyle.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="videoDuration">Duration</Label>
                <Select
                  value={formData.videoDuration}
                  onValueChange={value => setFormData(prev => ({ ...prev, videoDuration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15 seconds">15 seconds</SelectItem>
                    <SelectItem value="30 seconds">30 seconds</SelectItem>
                    <SelectItem value="60 seconds">60 seconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  value={formData.additionalNotes}
                  onChange={e => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  placeholder="Specific requirements or creative direction..."
                  rows={3}
                />
              </div>

              {error && <div className="text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  "Generate Marketing Video"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Video</CardTitle>
              <CardDescription>Your AI-generated video will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
                  <Loader2 className="h-8 w-8 animate-spin text-orange-600 mb-4" />
                  <p className="text-gray-600">Generating your marketing video...</p>
                </div>
              ) : generatedContent ? (
                <div className="space-y-4">
                  {generatedContent.isDefaultResponse && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-700">
                        {generatedContent.message} - Using sample video
                      </p>
                    </div>
                  )}

                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="relative aspect-video w-full max-w-3xl mx-auto bg-black rounded-lg overflow-hidden shadow-xl">
                      <video
                        src={generatedContent.videoUrl}
                        controls
                        className="w-full h-full object-contain"
                        poster="/placeholder.svg"
                      />
                      <div className="absolute inset-0 pointer-events-none border border-gray-200/20 rounded-lg"></div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Button
                        variant="outline"
                        className="flex items-center px-8 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md transition-colors"
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Video
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
                  <Play className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Configure settings and generate your video</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}