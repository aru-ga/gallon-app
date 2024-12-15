import React, { useState, useEffect } from "react";
import { Edit, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Review, NewReview } from "@/types/reviewType";
import instance from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import StarRating from "./StarRating";

interface UserReviewProps {
  sellerId: string;
}

const UserReview: React.FC<UserReviewProps> = ({ sellerId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newReview, setNewReview] = useState<NewReview>({
    seller_id: sellerId,
    rating: 0,
    comment: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { toast } = useToast();
  const token = sessionStorage.getItem("authToken");
  const user = sessionStorage.getItem("user_session");
  const userId = user ? JSON.parse(user).user.id : null;

  useEffect(() => {
    fetchReviews();
  }, [sellerId]);

  const fetchReviews = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await instance.get(
        `https://api-beli-galon.vercel.app/api/users/reviews/${sellerId}`
      );

      setReviews(response.data.data);
      if (token) {
        const userReview = response.data.data.find(
          (review: Review) => review.user_id === userId
        );
        setUserReview(userReview || null);
      }
    } catch (err) {
      console.error("Error mengambil ulasan:", err);
      setReviews([]);
      setError("Gagal mengambil ulasan.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await instance.post(
        `https://api-beli-galon.vercel.app/api/users/reviews`,
        newReview,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) throw new Error("Gagal mengirim ulasan");
      await fetchReviews();
      setNewReview({ seller_id: sellerId, rating: 0, comment: "" });
      toast({
        title: "Ulasan terkirim",
        description: "Terima kasih atas tanggapan Anda!",
      });
    } catch (err) {
      console.error("Error mengirim ulasan:", err);
      toast({
        title: "Error",
        description: "Gagal mengirim ulasan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateReview = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await instance.patch(
        `https://api-beli-galon.vercel.app/api/users/reviews/${userReview?.id}`,
        newReview,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) throw new Error("Gagal memperbarui ulasan");
      await fetchReviews();
      setIsEditing(false);
      toast({
        title: "Ulasan diperbarui",
        description: "Terima kasih atas pembaruan ulasan Anda!",
      });
    } catch (err) {
      console.error("Error memperbarui ulasan:", err);
      toast({
        title: "Error",
        description: "Gagal memperbarui ulasan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteReview = async (): Promise<void> => {
    try {
      const response = await instance.delete(
        `https://api-beli-galon.vercel.app/api/users/reviews/${userReview?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) throw new Error("Gagal menghapus ulasan");
      await fetchReviews();
      setUserReview(null);
      setNewReview({ seller_id: sellerId, rating: 0, comment: "" });
      toast({
        title: "Ulasan dihapus",
        description: "Ulasan Anda telah berhasil dihapus.",
      });
    } catch (err) {
      console.error("Error menghapus ulasan:", err);
      toast({
        title: "Error",
        description: "Gagal menghapus ulasan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div className="text-center py-8">Memuat ulasan...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Ulasan Pelanggan
          </h3>
          {reviews.length === 0 ? (
            <Card className="shadow-md border border-gray-200">
              <CardContent className="p-4">
                <p className="text-center text-muted-foreground">
                  Belum ada ulasan untuk penjual ini. Jadilah yang pertama
                  memberikan ulasan!
                </p>
              </CardContent>
            </Card>
          ) : (
            reviews.map((review) => (
              <Card
                key={review.id}
                className="shadow-md border border-gray-200"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg"
                        alt={review.user_name}
                      />
                      <AvatarFallback>
                        {review.user_name ? review.user_name.charAt(0) : "P"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {review.user_name || "Anonim"}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-400">
                          {review.created_at
                            ? new Date(review.created_at).toLocaleDateString(
                                "id-ID"
                              )
                            : "Tanggal tidak diketahui"}
                        </span>
                      </div>
                      <div className="flex my-1">
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-gray-700 dark:text-gray-400 text-sm">
                        {review.comment || "Tidak ada komentar"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {token ? (
          userReview && !isEditing ? (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Ulasan Anda</h3>
                <div className="flex gap-1 mb-4">
                  <StarRating rating={userReview.rating} />
                </div>
                <p>{userReview.comment}</p>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(true);
                      setNewReview({
                        seller_id: sellerId,
                        rating: userReview.rating,
                        comment: userReview.comment,
                      });
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Ulasan
                  </Button>
                  <Button variant="outline" onClick={handleDeleteReview}>
                    <Trash className="w-4 h-4 mr-2" />
                    Hapus Ulasan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">
                  {isEditing ? "Edit ulasan Anda" : "Berikan ulasan Anda"}
                </h3>
                <form
                  onSubmit={isEditing ? handleUpdateReview : handleSubmitReview}
                >
                  <div className="flex gap-1 mb-4">
                    <StarRating
                      rating={newReview.rating}
                      onRatingChange={(rating) =>
                        setNewReview({ ...newReview, rating })
                      }
                    />
                  </div>
                  <Textarea
                    placeholder="Bagikan pendapat Anda tentang penjual ini"
                    className="min-h-[100px] mb-4"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-400"
                    disabled={
                      newReview.rating === 0 || newReview.comment.trim() === ""
                    }
                  >
                    {isEditing ? "Perbarui Ulasan" : "Kirim Ulasan"}
                  </Button>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => setIsEditing(false)}
                    >
                      Batal
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          )
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground dark:text-gray-400">
              Anda harus login untuk memberikan ulasan.
            </p>
            <Button
              variant="link"
              onClick={() => {
                window.location.href = "/login-user";
              }}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReview;
