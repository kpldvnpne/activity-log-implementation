import React, {
  ReactElement,
  ReactNode,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  DotsHorizontalIcon,
  AdjustmentsIcon,
  PlusIcon,
  CalendarIcon,
  MailIcon,
  ReplyIcon,
  SelectorIcon,
  ChatIcon,
  TrendingUpIcon,
  XIcon,
} from "@heroicons/react/solid";

const defaultBoundingRect: DOMRect = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  toJSON: () => ({}),
};

interface TimelineProps {
  startRef: RefObject<HTMLDivElement>;
  endRef: RefObject<HTMLDivElement>;
  parentRef: RefObject<HTMLDivElement>;
}

function TimelineLine({ startRef, endRef, parentRef }: TimelineProps) {
  const startBox =
    startRef.current?.getBoundingClientRect() ?? defaultBoundingRect;
  const endBox = endRef.current?.getBoundingClientRect() ?? defaultBoundingRect;
  const parentBoundingBox =
    parentRef.current?.getBoundingClientRect() ?? defaultBoundingRect;

  return (
    <div
      className="absolute w-[3px] bg-gray-200 z-0"
      style={{
        top: startBox.top + startBox.height / 2 - parentBoundingBox.top,
        left: startBox.left + startBox.width / 2 - 2 - parentBoundingBox.left,
        bottom: parentBoundingBox.height - (endBox.top + endBox.height / 2),
      }}
    />
  );
}

const bgColor = "#F5F6F7";

function App(): React.ReactElement {
  const firstActivityIconRef = useRef<HTMLDivElement>(null);
  const lastActivityIconRef = useRef<HTMLDivElement>(null);
  const parentDivRef = useRef<HTMLDivElement>(null);

  useWindowSize();

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="h-screen font-sans overflow-y-scroll"
    >
      <div
        className="w-full xl:w-4/6 mx-auto px-2 pb-4 relative"
        ref={parentDivRef}
      >
        <TimelineLine
          startRef={firstActivityIconRef}
          endRef={lastActivityIconRef}
          parentRef={parentDivRef}
        />
        <div className="w-full h-full space-y-6 z-10 relative">
          <div
            className="w-full sticky top-0 z-50 py-4"
            style={{ backgroundColor: bgColor }}
          >
            <SearchInput />
          </div>
          <ActivityLogsHeader />
          <ActivityLog
            icon={
              <ActivityIcon ref={firstActivityIconRef}>
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
          <EventActivityLog
            eventName="Design Review with Timeless"
            startTime="10:00"
            endTime="11:00 AM"
            location="Mumbai Maharastra"
            namesOfParticipants={[
              "Brianna Clinton",
              "Melissa Pinto",
              "Olivia Emmanuel",
              "abc",
              "def",
              "ghi",
            ]}
          />
          <MessageActivityLog />
          <MentionedInCommentActivityLog />

          <ActivityLog
            icon={
              <ActivityIcon>
                <TrendingUpIcon />
              </ActivityIcon>
            }
            body={
              <div className="flex flex-row items-center space-x-4">
                <div className="flex flex-row space-x-2 items-center">
                  <AvatarOfName name="Olivia Emmanuel" />
                  <p>
                    <Unimportant>Gained by </Unimportant>
                    <Highlighted>Olivia Emmanuel</Highlighted>
                    <Unimportant> via automatic rule </Unimportant>
                    <Highlighted>on pull request review</Highlighted>
                  </p>
                </div>
                <DotSeparator />
                <TimeOfActivity days={8} />
              </div>
            }
          />
          <ActivityLog
            icon={
              <ActivityIcon>
                <PlusIcon />
              </ActivityIcon>
            }
            body={
              <div className="flex flex-row items-center space-x-4">
                <div className="flex flex-row items-center space-x-3">
                  <AvatarOfName name="Bantlee Clinton" />
                  <p>
                    <Highlighted>Bantlee Clinton</Highlighted>
                    <Unimportant> applied </Unimportant>
                    <Highlighted>Essential</Highlighted>
                    <Unimportant> tag</Unimportant>
                  </p>
                </div>
                <DotSeparator />
                <TimeOfActivity days={10} />
              </div>
            }
          />
          <ActivityLog
            icon={
              <ActivityIcon ref={lastActivityIconRef}>
                <XIcon />
              </ActivityIcon>
            }
            body={
              <div className="flex flex-row items-center space-x-4">
                <div className="flex flex-row items-center space-x-3">
                  <AvatarOfName name="William Cooper" />
                  <p>
                    <Unimportant>Assignment closed by </Unimportant>
                    <Highlighted>William Cooper</Highlighted>
                  </p>
                </div>
                <DotSeparator />
                <TimeOfActivity days={12} />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;

interface Message {
  who: string;
  whenInDaysAgo: number;
  text: string;
}

const MessageActivityLog = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
  const messages: Message[] = [
    {
      who: "Brianna Clinton",
      whenInDaysAgo: 4,
      text: `Just checking in to see if I can help your team at timeless in anyway. Please don’t hesistate to reach out and would love to chat. We shipped out a bunch of exciting new updates in Timeless (such as Timeless links to share with anyone outside your org) and you can find more details here.`,
    },
    { who: "abc", whenInDaysAgo: 123, text: "abc" },
    { who: "abc", whenInDaysAgo: 123, text: "abc" },
    { who: "abc", whenInDaysAgo: 123, text: "abc" },
  ];

  const numberOfHiddenMessagesInThread = messages.length - 1;

  return (
    <ActivityLog
      icon={
        <ActivityIcon important ref={ref}>
          <MailIcon />
        </ActivityIcon>
      }
      body={
        <div className="w-full space-y-4">
          <StackedDisplay>
            {messages.map((message, index) => (
              <MessageCard
                key={index}
                who={message.who}
                when={message.whenInDaysAgo}
                message={message.text}
              />
            ))}
          </StackedDisplay>
          <div className="text-blue-600 flex flex-row space-x-4 items-center cursor-pointer">
            <IconButton>
              <SelectorIcon />
            </IconButton>
            <div>
              View {numberOfHiddenMessagesInThread} more threads from this week
            </div>
          </div>
        </div>
      }
    />
  );
});

const MentionedInCommentActivityLog = React.forwardRef<HTMLDivElement>(
  (_, ref) => {
    return (
      <ActivityLog
        icon={
          <ActivityIcon important ref={ref}>
            <ChatIcon />
          </ActivityIcon>
        }
        body={
          <div className="space-y-3">
            <MentionedInCommentActivityHeader />
            <Comment />
            <div className="flex flex-row">
              <span className="text-gray-500 w-8 h-8 rotate-180">
                <ReplyIcon />
              </span>
              <div className="space-x-3 flex flex-row items-center">
                <StackedAvatarsOfPeople
                  names={["Sam Miguel", "Brianna Clinton"]}
                  color="background"
                />
                <span className="text-blue-600">View 6 more replies</span>
              </div>
            </div>
          </div>
        }
      />
    );
  }
);

function Comment() {
  return (
    <Card>
      <div className="pl-6 pr-12 py-4">
        <p className="text-gray-700 text-justify">
          When a person has access to both the intuitive, creative and visual
          right brain, and the analytical, logical, verbal left brain, then the
          whole brain is working. <Highlighted>@Olivia_emmanuel</Highlighted>
        </p>
      </div>
    </Card>
  );
}

function MentionedInCommentActivityHeader() {
  return (
    <div className="flex flex-row items-center space-x-3">
      <AvatarOfName name="Mellissa Pinto" />
      <p>
        <Highlighted>Mellissa Pinto</Highlighted>
        <Unimportant> mentioned you in a comment in </Unimportant>
        <Highlighted>Item 235667</Highlighted>
      </p>
      <DotSeparator />
      <TimeOfActivity days={7} />
    </div>
  );
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

interface StackedDisplayProps {
  children: Array<ReactElement>;
}

function StackedDisplay({ children }: StackedDisplayProps) {
  const firstChild = children[0];
  const firstDivRef = useRef<HTMLDivElement>(null);
  const lastDivRef = useRef<HTMLDivElement>(null);

  useWindowSize();

  const componentPageBottom =
    lastDivRef.current?.getBoundingClientRect().bottom ?? 0;
  const componentPageTop =
    firstDivRef.current?.getBoundingClientRect().top ?? 0;
  const height = componentPageBottom - componentPageTop;

  return (
    <div className="relative z-0 h-auto w-full" style={{ height }}>
      {children.map((child, index) => (
        <div
          className={`absolute w-full`}
          style={{
            paddingLeft: 8 * index,
            paddingRight: 8 * index,
            zIndex: -10 * index,
            transform: `translateY(${index * 5}%)`,
          }}
          ref={
            index === 0
              ? firstDivRef
              : index === children.length - 1
              ? lastDivRef
              : undefined
          }
        >
          {firstChild}
        </div>
      ))}
    </div>
  );
}

interface MessageCardProps {
  who: string;
  when: number;
  message: string;
}

function MessageCard({ who, when, message }: MessageCardProps) {
  return (
    <Card>
      <div className="p-6 pr-12 space-y-3">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row space-x-4 items-center">
            <div className="flex flex-row space-x-2 items-center">
              <AvatarOfName name={who} />
              <Highlighted>{who}</Highlighted>
            </div>
            <DotSeparator />
            <TimeOfActivity days={when} />
          </div>
          <div className="flex flex-row space-x-4 text-gray-400">
            <ReplyIcon className="w-6 h-6" />
            <DotsHorizontalIcon className="w-6 h-6" />
          </div>
        </div>
        <p className="text-justify text-md leading-6 text-gray-800 font-regular">
          {message}
        </p>
      </div>
    </Card>
  );
}

interface EventActivityLogProps {
  eventName: string;
  startTime: string;
  endTime: string;
  location: string;
  namesOfParticipants: Array<string>;
}

function EventActivityLog({
  eventName,
  startTime,
  endTime,
  location,
  namesOfParticipants,
}: EventActivityLogProps) {
  return (
    <ActivityLog
      icon={
        <ActivityIcon important>
          <CalendarIcon />
        </ActivityIcon>
      }
      body={
        <Card>
          <div className="p-4 flex flex-row justify-between items-start">
            <div className="border-l-2 border-l-yellow-500 py-2 pl-6">
              <h2 className="font-semibold">{eventName}</h2>
              <p className="text-gray-400">
                {startTime} - {endTime}, {location}
              </p>
            </div>
            <StackedAvatarsOfPeople names={namesOfParticipants} />
          </div>
        </Card>
      }
    />
  );
}

interface StackedAvatarsOfPeopleProps {
  names: Array<string>;
  color?: "background" | "white";
}

function StackedAvatarsOfPeople({
  names,
  color = "white",
}: StackedAvatarsOfPeopleProps) {
  const namesToShow = names.length <= 3 ? names : names.slice(0, 3);
  const remainingNamesCount = names.length <= 3 ? 0 : names.length - 3;
  return (
    <div className="flex flex-row space-x-2 items-center">
      <div className="flex flex-row -space-x-3">
        {namesToShow.map((name) => (
          <AvatarOfNameWithBorder name={name} borderColor={color} />
        ))}
      </div>
      {remainingNamesCount > 0 && (
        <span className="text-gray-600">
          and {remainingNamesCount}{" "}
          {remainingNamesCount > 1 ? "others" : "other"}
        </span>
      )}
    </div>
  );
}

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
  return <span className="font-semibold text-md">{children}</span>;
}

interface AvatarOfNameWithBorderProps {
  name: string;
  borderColor: "background" | "white";
}

function AvatarOfNameWithBorder({
  name,
  borderColor,
}: AvatarOfNameWithBorderProps) {
  return <AvatarOfName name={name} borderColor={borderColor} />;
}

interface NameAvatarProps {
  name: string;
  borderColor?: AvatarOfNameWithBorderProps["borderColor"];
}

function AvatarOfName({ name, borderColor }: NameAvatarProps) {
  const nameInitial = name[0];
  return (
    <div
      className={`rounded-full h-10 w-10 bg-blue-400 text-gray-700 flex flex-shrink-0 items-center justify-center text-lg`}
      style={{
        borderColor:
          borderColor === "white"
            ? "#FFFFFF"
            : borderColor === "background"
            ? bgColor
            : undefined,
        borderWidth: borderColor ? 2 : "none",
      }}
    >
      {nameInitial}
    </div>
  );
}

interface ActivityIconProps {
  important?: boolean;
  children: ReactNode;
}

const ActivityIcon = React.forwardRef<HTMLDivElement, ActivityIconProps>(
  ({ children, important = false }, ref) => {
    const textColorClass = important ? "text-white" : "text-gray-700";
    const backgroundColorClass = important ? "bg-blue-600" : "bg-gray-300";
    return (
      <div
        ref={ref}
        style={{ borderColor: bgColor }}
        className={`rounded-full ${backgroundColorClass} ${textColorClass} h-10 w-10 flex items-center justify-center flex-shrink-0 p-1 border-4`}
      >
        {children}
      </div>
    );
  }
);

function ActivityLogsHeader() {
  return (
    <div className="flex flex-row justify-between items-center">
      <ActivityLogsTitle />
      <ActivityLogsHeaderActions />
    </div>
  );
}

function ActivityLogsHeaderActions() {
  return (
    <div className="text-gray-400 flex flex-row space-x-4">
      <ShowAllActivityToggle />
      <AdjustmentIconButton />
    </div>
  );
}

function AdjustmentIconButton() {
  return (
    <IconButton>
      <AdjustmentsIcon />
    </IconButton>
  );
}

interface IconButtonProps {
  children: ReactElement;
}

function IconButton({ children }: IconButtonProps) {
  return (
    <div className="w-10 h-10 rounded-full border-2 border-gray-300 p-1 bg-white">
      {children}
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

function ActivityLogsTitle() {
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
