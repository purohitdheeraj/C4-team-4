import Banner from "./components/Banner";
import General from "./components/General";
import Project from "./components/Project";

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="lg:grid-cols-22 mt-3 flex h-fit w-full flex-col gap-5 lg:grid">
        <div className="col-span-6 lg:!mb-0">
          <Banner />
        </div>
      </div>
      {/* all project & ... */}

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>

        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
