import React, { ReactNode } from "react";
import {
  DotsHorizontalIcon,
  AdjustmentsIcon,
  PlusIcon,
  CalendarIcon,
} from "@heroicons/react/solid";

function App(): React.ReactElement {
  return (
    <div style={{ backgroundColor: "#F5F6F7" }} className="h-screen font-sans">
      <div className="w-5/6 xl:w-4/6  mx-auto space-y-6 py-4">
        <SearchInput />
        <ActivityLogHeader />
        <ActivityLog
          icon={
            <ActivityIcon>
              <PlusIcon />
            </ActivityIcon>
          }
          body={
            <FileAddedActivity
              personName="Steve Matthew"
              fileName="file_documents.csv"
            />
          }
        />
        <ActivityLog
          icon={
            <ActivityIcon important>
              <CalendarIcon />
            </ActivityIcon>
          }
          body={
            <Card>
              <div className="p-4 flex flex-row justify-between">
                <div className="border-l-2 border-l-yellow-500 py-2 pl-6">
                  <h2 className="font-semibold">Design Review with Timeless</h2>
                  <p className="text-gray-400">
                    10:00 - 11:00 AM, Mumbai Maharastra
                  </p>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="flex flex-row -space-x-3">
                    <AvatarOfNameWithBorder name="Brianna Clinton" />
                    <AvatarOfNameWithBorder name="Melissa Pinto" />
                    <AvatarOfNameWithBorder name="Olivia Emmanuel" />
                  </div>
                  <span className="text-gray-600">and 4 others</span>
                </div>
              </div>
            </Card>
          }
        />
      </div>
    </div>
  );
}

export default App;

interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 w-full">
      {children}
    </div>
  );
}

interface ActivityLogProps {
  icon: ReactNode;
  body: ReactNode;
}

function ActivityLog({ icon, body }: ActivityLogProps) {
  return (
    <div className="flex flex-row items-start space-x-10">
      {icon}
      {body}
    </div>
  );
}

interface FileAddedActivityProps {
  personName: string;
  fileName: string;
}

function FileAddedActivity({ personName, fileName }: FileAddedActivityProps) {
  return (
    <div className="flex flex-row items-center justify-center space-x-3">
      <AvatarOfName name={personName} />
      <p>
        <Highlighted>{personName}</Highlighted>
        <Unimportant> added </Unimportant>
        <Highlighted>{fileName}</Highlighted>
      </p>
      <DotSeparator />
      <TimeOfActivity days={2} />
    </div>
  );
}

interface UnimportantProps {
  children: ReactNode;
}

function Unimportant({ children }: UnimportantProps) {
  return <span className="text-gray-400 font-regular">{children}</span>;
}

interface TimeOfActivityProps {
  days: number;
}

function TimeOfActivity({ days }: TimeOfActivityProps) {
  const isPlural = days >= 1;
  const daysNounPhrase = isPlural ? "days" : "day";
  return (
    <span className="text-gray-400 font-medium text-sm">
      {days} {daysNounPhrase} ago
    </span>
  );
}

function DotSeparator() {
  return <div className="rounded-full w-1 h-1 bg-gray-400" />;
}

interface HighlightedProps {
  children: ReactNode;
}

function Highlighted({ children }: HighlightedProps) {
  return <span className="font-semibold text-lg">{children}</span>;
}

function AvatarOfNameWithBorder({ name }: NameAvatarProps) {
  return <AvatarOfName name={name} hasBorder />;
}

interface NameAvatarProps {
  name: string;
  hasBorder?: boolean;
}

function AvatarOfName({ name, hasBorder = false }: NameAvatarProps) {
  const nameInitial = name[0];
  return (
    <div
      className={`rounded-full h-10 w-10 bg-blue-400 text-gray-700 flex items-center justify-center text-lg ${
        hasBorder ? "border-2 border-white" : ""
      }`}
    >
      {nameInitial}
    </div>
  );
}

interface ActivityIconProps {
  important?: boolean;
  children: ReactNode;
}

function ActivityIcon({ children, important = false }: ActivityIconProps) {
  const textColorClass = important ? "text-white" : "text-gray-700";
  const backgroundColorClass = important ? "bg-blue-600" : "bg-gray-300";
  return (
    <div
      className={`rounded-full ${backgroundColorClass} ${textColorClass} h-10 w-10 p-2`}
    >
      {children}
    </div>
  );
}

function ActivityLogHeader() {
  return (
    <div className="flex flex-row justify-between items-center">
      <ActivityLogTitle />
      <ActivityLogActions />
    </div>
  );
}

function ActivityLogActions() {
  return (
    <div className="text-gray-400 flex flex-row space-x-4">
      <ShowAllActivityToggle />
      <AdjustmentIconButton />
    </div>
  );
}

function AdjustmentIconButton() {
  return (
    <div className="w-10 h-10 rounded-full border-2 border-gray-300 p-1 bg-white">
      <AdjustmentsIcon />
    </div>
  );
}

function ShowAllActivityToggle() {
  return (
    <div className="flex flex-row space-x-3 items-center">
      <span className="text-gray-600">Show all activity</span>
      <Switch />
    </div>
  );
}

function Switch() {
  return (
    <div className="w-16 h-8 bg-gray-300 rounded-full flex">
      <div className="w-6 h-6 bg-white rounded-full self-center ml-1" />
    </div>
  );
}

function ActivityLogTitle() {
  return <h2 className="text-3xl font-bold">Activity logs</h2>;
}

function SearchInput() {
  return (
    <div className="flex flex-row items-center justify-between relative text-lg">
      <input
        type="text"
        className="placeholder:text-gray-400 focus:outline-none w-full h-20 bg-white rounded-3xl p-5 border-2 border-gray-200  focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        placeholder="Comment or type '/' for comments"
      />
      <Actions />
    </div>
  );
}

function Actions() {
  return (
    <div className="text-gray-400 space-x-3 flex flex-row items-baseline content-center absolute right-5">
      <span>@</span>
      <span className="font-bold">B</span>
      <span className="italic font-serif">I</span>
      <span className="underline">U</span>
      <DotsHorizontalIcon className="h-6 w-6 self-center" />
    </div>
  );
}
