import NewStory from "@/components/NewStory";

const page = ({ params }: { params: { storyId: string } }) => {
  // console.log("storyId:", params.storyId);
  return (
    <div className="max-w-[1000px] mx-auto">
      <NewStory />
    </div>
  );
};

export default page;
