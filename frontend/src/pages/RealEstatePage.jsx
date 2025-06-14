import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import {
  ArrowLeft,
  Download,
  Play,
  Loader2,
  MapPin,
  DollarSign,
  HomeIcon,
  Bath,
  AlertCircle,
  ExternalLink,
} from "lucide-react"
import { Link } from "react-router-dom"
import { generateRealEstateVideo, validateRealEstateParams } from "../services/realEstateService"
import { useToast } from "../hooks/use-toast"

export default function RealEstatePage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tourStyle: "",
    focusAreas: [],
    narrationStyle: "",
    duration: "",
    additionalRequirements: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState(null)
  const [error, setError] = useState(null)
  const [validation, setValidation] = useState(null)

  const propertyDetails = {
    address: "12012 Crest Ct, Beverly Hills, CA 90210",
    price: "$10,183,985",
    bedrooms: 5,
    bathrooms: 6.5,
    squareFootage: "6,100",
    features: [
      "Luxury estate",
      "Three-car garage",
      "Landscaped grounds",
      "Elegant entrance with grand staircase",
      "Modern design",
      "Prime Beverly Hills location",
    ],
  }

  const focusAreaOptions = [
    "kitchen",
    "bedrooms",
    "bathrooms",
    "living room",
    "outdoor space",
    "master suite",
    "garage",
    "basement"
  ];

  const handleFocusAreaChange = (area, checked) => {
    setFormData((prev) => {
      const currentFocusAreas = prev.focusAreas || [];
      const newFocusAreas = checked 
        ? [...currentFocusAreas, area]
        : currentFocusAreas.filter((a) => a !== area);
      
      return {
        ...prev,
        focusAreas: newFocusAreas,
      };
    });
  }

  const validateForm = async () => {
    try {
      // Ensure focusAreas is an array and not empty
      if (!formData.focusAreas || formData.focusAreas.length === 0) {
        toast({
          title: "Validation Error",
          description: "Please select at least one focus area",
          variant: "destructive"
        });
        return false;
      }

      const validationData = {
        tourStyle: formData.tourStyle,
        narrationStyle: formData.narrationStyle,
        focusAreas: formData.focusAreas,
        tourDuration: formData.duration
      };
      
      const response = await validateRealEstateParams(validationData);
      setValidation(response);
      
      if (!response.valid) {
        const errorMessages = Object.entries(response.validationResults)
          .filter(([_, result]) => !result.valid)
          .map(([field, result]) => `${field}: ${result.message}`)
          .join('\n');
        
        toast({
          title: "Validation Error",
          description: errorMessages,
          variant: "destructive"
        });
      }
      
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
    
    // Validate focus areas before proceeding
    if (!formData.focusAreas || formData.focusAreas.length === 0) {
      setError("Please select at least one focus area");
      return;
    }
    
    const isValid = await validateForm();
    if (!isValid) {
      setError("Please fix validation issues");
      return;
    }

    setIsGenerating(true);
    try {
      const requestData = {
        tourStyle: formData.tourStyle,
        narrationStyle: formData.narrationStyle,
        focusAreas: formData.focusAreas,
        tourDuration: formData.duration,
        additionalRequirements: formData.additionalRequirements,
        propertyDetails
      };
      
      const response = await generateRealEstateVideo(requestData);
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
  }

  const handleDownload = () => {
    if (!generatedContent?.videoUrl) return;
    const link = document.createElement('a');
    link.href = generatedContent.videoUrl;
    link.download = `real-estate-tour-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Real Estate Virtual Tour Generator</h1>
          <p className="text-lg text-gray-600">Create immersive virtual property tours using AI</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HomeIcon className="h-5 w-5 mr-2" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-gray-500" />
                <div>
                  <p className="font-medium text-sm">Address</p>
                  <p className="text-sm text-gray-600">{propertyDetails.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <DollarSign className="h-4 w-4 mt-1 text-gray-500" />
                <div>
                  <p className="font-medium text-sm">Price</p>
                  <p className="text-lg font-bold text-green-600">{propertyDetails.price}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <HomeIcon className="h-6 w-6 mx-auto text-blue-600 mb-1" />
                  <p className="text-sm font-medium">{propertyDetails.bedrooms} Bedrooms</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Bath className="h-6 w-6 mx-auto text-blue-600 mb-1" />
                  <p className="text-sm font-medium">{propertyDetails.bathrooms} Bathrooms</p>
                </div>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">{propertyDetails.squareFootage} sq ft</p>
              </div>

              <div>
                <p className="font-medium text-sm mb-2">Key Features</p>
                <ul className="space-y-1">
                  {propertyDetails.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tour Configuration</CardTitle>
              <CardDescription>Customize your virtual property tour settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="tourStyle">Tour Style *</Label>
                <Select
                  value={formData.tourStyle}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, tourStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tour style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="family-friendly">Family-Friendly</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                  </SelectContent>
                </Select>
                {validation?.validationResults?.tourStyle && !validation.validationResults.tourStyle.valid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validation.validationResults.tourStyle.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Focus Areas *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {focusAreaOptions.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={area}
                        checked={formData.focusAreas.includes(area)}
                        onChange={(e) => handleFocusAreaChange(area, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={area} className="text-sm">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
                {validation?.validationResults?.focusAreas && !validation.validationResults.focusAreas.valid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validation.validationResults.focusAreas.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="narrationStyle">Narration Style *</Label>
                <Select
                  value={formData.narrationStyle}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, narrationStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select narration style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informative">Informative</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
                {validation?.validationResults?.narrationStyle && !validation.validationResults.narrationStyle.valid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validation.validationResults.narrationStyle.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="duration">Tour Duration *</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 seconds">30 seconds</SelectItem>
                    <SelectItem value="1 minute">1 minute</SelectItem>
                    <SelectItem value="2-3 minutes">2-3 minutes</SelectItem>
                    <SelectItem value="5 minutes">5 minutes</SelectItem>
                    <SelectItem value="10 minutes">10 minutes</SelectItem>
                  </SelectContent>
                </Select>
                {validation?.validationResults?.tourDuration && !validation.validationResults.tourDuration.valid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validation.validationResults.tourDuration.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                <Textarea
                  id="additionalRequirements"
                  placeholder="Any specific requirements for the virtual tour..."
                  value={formData.additionalRequirements}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      additionalRequirements: e.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>}

              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-blue-600 hover:bg-blue-700">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Virtual Tour...
                  </>
                ) : (
                  "Generate Virtual Tour"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {(isGenerating || generatedContent) && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Generated Virtual Tour</CardTitle>
              <CardDescription>Your AI-generated property tour will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
                  <p className="text-gray-600">Generating your virtual tour...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few minutes</p>
                </div>
              ) : generatedContent ? (
                <div className="space-y-6">
                  {generatedContent.isDefaultResponse && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800 mb-1">Demo Mode Active</h4>
                          <p className="text-sm text-yellow-700">{generatedContent.message}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="max-w-4xl mx-auto">
                      <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden shadow-xl">
                        {generatedContent.videoUrl ? (
                          <video
                            src={generatedContent.videoUrl}
                            controls
                            className="w-full h-full object-contain"
                            poster="/placeholder.svg"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400">No video available</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 space-y-4">
                        <div className="flex flex-wrap gap-4 justify-center">
                          <Button
                            onClick={() => window.open(generatedContent.videoUrl, '_blank')}
                            className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            View Full Size
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleDownload}
                            className="flex items-center px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Video
                          </Button>
                        </div>

                        {generatedContent.parameters && (
                          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Tour Parameters</h3>
                            <dl className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <dt className="text-gray-500">Tour Style</dt>
                                <dd className="font-medium text-gray-900">{generatedContent.parameters.tourStyle}</dd>
                              </div>
                              <div>
                                <dt className="text-gray-500">Narration Style</dt>
                                <dd className="font-medium text-gray-900">{generatedContent.parameters.narrationStyle}</dd>
                              </div>
                              <div>
                                <dt className="text-gray-500">Duration</dt>
                                <dd className="font-medium text-gray-900">{generatedContent.parameters.tourDuration}</dd>
                              </div>
                              <div>
                                <dt className="text-gray-500">Focus Areas</dt>
                                <dd className="font-medium text-gray-900">
                                  {generatedContent.parameters.focusAreas?.join(', ')}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
                  <Play className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Configure settings and generate your tour</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 