import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Review } from "@/types/reviewType";
import { Skeleton } from "@/components/ui/skeleton";

const SellerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const { toast } = useToast();

  const token = sessionStorage.getItem("authToken");

  const fetchSellerReviews = async () => {
    const response = await axios.get(
      "https://api-beli-galon.vercel.app/api/sellers/reviews",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetchSellerReviews();
      if (response.success) {
        setReviews(response.data);
        setFilteredReviews(response.data);
      } else {
        setError(response.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to fetch reviews. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch reviews. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (filterRating) {
      setFilteredReviews(
        reviews.filter((review) => review.rating === filterRating)
      );
    } else {
      setFilteredReviews(reviews);
    }
  }, [reviews, filterRating]);

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "EEEE, d MMMM yyyy 'pukul' HH.mm", { locale: id });
  };

  const getRatingCounts = () => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((review) => {
      counts[review.rating as keyof typeof counts]++;
    });
    return counts;
  };

  const ratingCounts = getRatingCounts();

  return (
    <SidebarInset className="dark:bg-gray-900 dark:text-white">
      <div className="flex flex-row items-center space-x-2 p-3 border-b ">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <h1 className="text-2xl font-bold dark:text-white">Ulasan Pelanggan</h1>
      </div>
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            Ringkasan Ulasan
          </h2>
          <div className="flex space-x-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() =>
                  setFilterRating(filterRating === rating ? null : rating)
                }
                className={`flex items-center space-x-1 p-2 rounded dark:text-white ${
                  filterRating === rating
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                <span className="dark:text-white">{rating}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>
                  ({ratingCounts[rating as keyof typeof ratingCounts]})
                </span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mt-4" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mt-8">{error}</div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.user_name}`}
                      />
                      <AvatarFallback>
                        {review.user_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{review.user_name}</h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                              index < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </SidebarInset>
  );
};

export default SellerReviews;
