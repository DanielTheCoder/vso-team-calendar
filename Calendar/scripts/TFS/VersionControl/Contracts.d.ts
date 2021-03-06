import TFS_Core_Contracts = require("TFS/Core/Contracts");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
export interface AssociatedWorkItem {
    assignedTo: string;
    id: number;
    state: string;
    title: string;
    /**
    * REST url
    */
    url: string;
    webUrl: string;
    workItemType: string;
}
export interface Change<T> {
    changeType: VersionControlChangeType;
    item: T;
    newContent: ItemContent;
    sourceServerItem: string;
    url: string;
}
export interface ChangeCountDictionary {
}
export interface ChangeList<T> {
    allChangesIncluded: boolean;
    changeCounts: {
        [key: number]: number;
    };
    changes: Change<T>[];
    comment: string;
    commentTruncated: boolean;
    creationDate: Date;
    notes: CheckinNote[];
    owner: string;
    ownerDisplayName: string;
    ownerId: string;
    sortDate: Date;
    version: string;
}
/**
* Criteria used in a search for change lists
*/
export interface ChangeListSearchCriteria {
    /**
    * If provided, a version descriptor to compare against base
    */
    compareVersion: string;
    /**
    * If true, don't include delete history entries
    */
    excludeDeletes: boolean;
    /**
    * Whether or not to follow renames for the given item being queried
    */
    followRenames: boolean;
    /**
    * If provided, only include history entries created after this date (string)
    */
    fromDate: string;
    /**
    * If provided, a version descriptor for the earliest change list to include
    */
    fromVersion: string;
    /**
    * Path of item to search under
    */
    itemPath: string;
    /**
    * Version of the items to search
    */
    itemVersion: string;
    /**
    * Number of results to skip (used when clicking more...)
    */
    skip: number;
    /**
    * If provided, only include history entries created before this date (string)
    */
    toDate: string;
    /**
    * If provided, the maximum number of history entries to return
    */
    top: number;
    /**
    * If provided, a version descriptor for the latest change list to include
    */
    toVersion: string;
    /**
    * Alias or display name of user who made the changes
    */
    user: string;
}
export interface CheckinNote {
    name: string;
    value: string;
}
export interface FileContentMetadata {
    contentType: string;
    encoding: number;
    extension: string;
    fileName: string;
    isBinary: boolean;
    isImage: boolean;
    vsLink: string;
}
export interface GitBaseVersionDescriptor extends GitVersionDescriptor {
    /**
    * Version string identifier (name of tag/branch, SHA1 of commit)
    */
    baseVersion: string;
    /**
    * Version options - Specify additional modifiers to version (e.g Previous)
    */
    baseVersionOptions: GitVersionOptions;
    /**
    * Version type (branch, tag, or commit). Determines how Id is interpreted
    */
    baseVersionType: GitVersionType;
}
export interface GitBlobRef {
    _links: any;
    /**
    * SHA1 hash of git object
    */
    objectId: string;
    /**
    * Size of blob content (in bytes)
    */
    size: number;
    url: string;
}
export interface GitBranchStats {
    aheadCount: number;
    behindCount: number;
    commit: GitCommitRef;
    isBaseVersion: boolean;
    name: string;
}
export interface GitChange extends Change<GitItem> {
}
export interface GitCommit extends GitCommitRef {
    push: GitPushRef;
    treeId: string;
}
export interface GitCommitChanges {
    changeCounts: ChangeCountDictionary;
    changes: GitChange[];
}
export interface GitCommitDiffs {
    aheadCount: number;
    allChangesIncluded: boolean;
    behindCount: number;
    changeCounts: {
        [key: number]: number;
    };
    changes: GitChange[];
    commonCommit: string;
}
export interface GitCommitRef {
    _links: any;
    author: GitUserDate;
    changeCounts: ChangeCountDictionary;
    changes: GitChange[];
    comment: string;
    commentTruncated: boolean;
    commitId: string;
    committer: GitUserDate;
    parents: string[];
    remoteUrl: string;
    url: string;
}
export interface GitCommitToCreate {
    baseRef: GitRef;
    comment: string;
    pathActions: GitPathAction[];
}
export interface GitHistoryQueryResults extends HistoryQueryResults<GitItem> {
    /**
    * Seed commit used for querying history.  Used for skip feature.
    */
    startingCommitId: string;
    unpopulatedCount: number;
    unprocessedCount: number;
}
export interface GitItem extends ItemModel {
    /**
    * SHA1 of commit item was fetched at
    */
    commitId: string;
    /**
    * Type of object (Commit, Tree, Blob, Tag, ...)
    */
    gitObjectType: GitObjectType;
    /**
    * Shallow ref to commit that last changed this item Only populated if latestProcessedChange is requested May not be accurate if latest change is not yet cached
    */
    latestProcessedChange: GitCommitRef;
    /**
    * Git object id
    */
    objectId: string;
}
export interface GitItemDescriptor {
    /**
    * Path to item
    */
    path: string;
    /**
    * Specifies whether to include children (OneLevel), all descendants (Full), or None
    */
    recursionLevel: VersionControlRecursionType;
    /**
    * Version string (interpretation based on VersionType defined in subclass
    */
    version: string;
    /**
    * Version modifiers (e.g. previous)
    */
    versionOptions: GitVersionOptions;
    /**
    * How to interpret version (branch,tag,commit)
    */
    versionType: GitVersionType;
}
export interface GitItemRequestData {
    /**
    * Whether to include metadata for all items
    */
    includeContentMetadata: boolean;
    /**
    * Whether to include the _links field on the shallow references
    */
    includeLinks: boolean;
    /**
    * Collection of items to fetch, including path, version, and recursion level
    */
    itemDescriptors: GitItemDescriptor[];
    /**
    * Whether to include shallow ref to commit that last changed each item
    */
    latestProcessedChange: boolean;
}
/**
* Encapsulates the reference metadata of a Git media object.
*/
export interface GitMediaObjectRef {
    /**
    * Gets or sets the reference links of the Git media object.
    */
    _links: any;
    /**
    * Gets or sets the Git media object identifier. This Id property duplicates the Oid property, but is required by the VSO REST specification.
    */
    id: string;
    /**
    * Gets or sets the Git media object identifier. This property exists for adherence to the GitHub Git Media contract.
    */
    oid: string;
    /**
    * Gets or sets the size of the Git media object in bytes. This property exists for adherence to the GitHub Git Media contract.
    */
    size: number;
    /**
    * Gets or sets the URL for the Git media object.
    */
    url: string;
}
export declare enum GitObjectType {
    Bad = 0,
    Commit = 1,
    Tree = 2,
    Blob = 3,
    Tag = 4,
    Ext2 = 5,
    OfsDelta = 6,
    RefDelta = 7,
}
export interface GitPathAction {
    action: GitPathActions;
    base64Content: string;
    path: string;
    rawTextContent: string;
    targetPath: string;
}
export declare enum GitPathActions {
    None = 0,
    Edit = 1,
    Delete = 2,
    Add = 3,
    Rename = 4,
}
export interface GitPullRequest {
    _links: any;
    closedDate: Date;
    codeReview: any;
    createdBy: VSS_Common_Contracts.IdentityRef;
    creationDate: Date;
    description: string;
    lastMergeCommit: GitCommitRef;
    lastMergeSourceCommit: GitCommitRef;
    lastMergeTargetCommit: GitCommitRef;
    mergeId: string;
    mergeStatus: PullRequestAsyncStatus;
    pullRequestId: number;
    remoteUrl: string;
    repository: GitRepository;
    reviewers: IdentityRefWithVote[];
    sourceRefName: string;
    status: PullRequestStatus;
    targetRefName: string;
    title: string;
    url: string;
}
export interface GitPullRequestSearchCriteria {
    creatorId: string;
    /**
    * Whether to include the _links field on the shallow references
    */
    includeLinks: boolean;
    repositoryId: string;
    reviewerId: string;
    sourceRefName: string;
    status: PullRequestStatus;
    targetRefName: string;
}
export interface GitPush extends GitPushRef {
    commits: GitCommitRef[];
    refUpdates: GitRefUpdate[];
    repository: GitRepository;
}
export interface GitPushEventData {
    afterId: string;
    beforeId: string;
    branch: string;
    commits: GitCommit[];
    repository: GitRepository;
}
export interface GitPushRef {
    _links: any;
    date: Date;
    pushCorrelationId: string;
    pushedBy: VSS_Common_Contracts.IdentityRef;
    pushId: number;
    url: string;
}
export interface GitPushSearchCriteria {
    fromDate: Date;
    /**
    * Whether to include the _links field on the shallow references
    */
    includeLinks: boolean;
    includeRefUpdates: boolean;
    pusherId: string;
    refName: string;
    toDate: Date;
}
export interface GitQueryCommitsCriteria {
    /**
    * Number of entries to skip
    */
    $skip: number;
    /**
    * Maximum number of entries to retrieve
    */
    $top: number;
    /**
    * Alias or display name of the author
    */
    author: string;
    /**
    * If provided, the earliest commit in the graph to search
    */
    compareVersion: GitVersionDescriptor;
    /**
    * If true, don't include delete history entries
    */
    excludeDeletes: boolean;
    /**
    * If provided, a lower bound for filtering commits alphabetically
    */
    fromCommitId: string;
    /**
    * If provided, only include history entries created after this date (string)
    */
    fromDate: string;
    /**
    * If provided, specifies the exact commit ids of the commits to fetch. May not be combined with other parameters.
    */
    ids: string[];
    /**
    * Whether to include the _links field on the shallow references
    */
    includeLinks: boolean;
    /**
    * Path of item to search under
    */
    itemPath: string;
    /**
    * If provided, identifies the commit or branch to search
    */
    itemVersion: GitVersionDescriptor;
    /**
    * If provided, an upper bound for filtering commits alphabetically
    */
    toCommitId: string;
    /**
    * If provided, only include history entries created before this date (string)
    */
    toDate: string;
    /**
    * Alias or display name of the committer
    */
    user: string;
}
export interface GitRef {
    _links: any;
    isLockedBy: VSS_Common_Contracts.IdentityRef;
    name: string;
    objectId: string;
    url: string;
}
export interface GitRefUpdate {
    name: string;
    newObjectId: string;
    oldObjectId: string;
    repositoryId: string;
}
export declare enum GitRefUpdateMode {
    /**
    * Indicates the Git protocol model where any refs that can be updated will be updated, but any failures will not prevent other updates from succeeding.
    */
    BestEffort = 0,
    /**
    * Indicates that all ref updates must succeed or none will succeed. All ref updates will be atomically written. If any failure is encountered, previously successful updates will be rolled back and the entire operation will fail.
    */
    AllOrNone = 1,
}
export interface GitRefUpdateResult {
    /**
    * Custom message for the result object For instance, Reason for failing.
    */
    customMessage: string;
    /**
    * Ref name
    */
    name: string;
    /**
    * New object ID
    */
    newObjectId: string;
    /**
    * Old object ID
    */
    oldObjectId: string;
    /**
    * Name of the plugin that rejected the updated.
    */
    rejectedBy: string;
    /**
    * Repository ID
    */
    repositoryId: string;
    /**
    * True if the ref update succeeded, false otherwise
    */
    success: boolean;
    /**
    * Status of the update from the TFS server.
    */
    updateStatus: GitRefUpdateStatus;
}
export interface GitRefUpdateResultSet {
    countFailed: number;
    countSucceeded: number;
    pushCorrelationId: string;
    pushIds: {
        [key: number]: number;
    };
    pushTime: Date;
    results: GitRefUpdateResult[];
}
export declare enum GitRefUpdateStatus {
    /**
    * Indicates that the ref update request was completed successfully.
    */
    Succeeded = 0,
    /**
    * Indicates that the ref update request could not be completed because part of the graph would be disconnected by this change, and the caller does not have ForcePush permission on the repository.
    */
    ForcePushRequired = 1,
    /**
    * Indicates that the ref update request could not be completed because the old object ID presented in the request was not the object ID of the ref when the database attempted the update. The most likely scenario is that the caller lost a race to update the ref.
    */
    StaleOldObjectId = 2,
    /**
    * Indicates that the ref update request could not be completed because the ref name presented in the request was not valid.
    */
    InvalidRefName = 3,
    /**
    * The request was not processed
    */
    Unprocessed = 4,
    /**
    * The ref update request could not be completed because the new object ID for the ref could not be resolved to a commit object (potentially through any number of tags)
    */
    UnresolvableToCommit = 5,
    /**
    * The ref update request could not be completed because the user lacks write permissions required to write this ref
    */
    WritePermissionRequired = 6,
    /**
    * The ref update request could not be completed because the user lacks note creation permissions required to write this note
    */
    ManageNotePermissionRequired = 7,
    /**
    * The ref update request could not be completed because the user lacks the permission to create a branch
    */
    CreateBranchPermissionRequired = 8,
    /**
    * The ref update request could not be completed because the user lacks the permission to create a tag
    */
    CreateTagPermissionRequired = 9,
    /**
    * The ref update could not be completed because it was rejected by the plugin.
    */
    RejectedByPlugin = 10,
    /**
    * The ref update could not be completed because the ref is locked by another user.
    */
    Locked = 11,
    /**
    * The ref update could not be completed because, in case-insensitive mode, the ref name conflicts with an existing, differently-cased ref name.
    */
    RefNameConflict = 12,
    /**
    * The ref update could not be completed because it was rejected by policy.
    */
    RejectedByPolicy = 13,
    /**
    * Indicates that the ref update request was completed successfully, but the ref doesn't actually exist so no changes were made.  This should only happen during deletes.
    */
    SucceededNonExistentRef = 14,
    /**
    * Indicates that the ref update request was completed successfully, but the passed-in ref was corrupt - as in, the old object ID was bad.  This should only happen during deletes.
    */
    SucceededCorruptRef = 15,
}
export interface GitRepository {
    _links: any;
    defaultBranch: string;
    id: string;
    name: string;
    project: TFS_Core_Contracts.TeamProjectReference;
    remoteUrl: string;
    url: string;
}
export interface GitTargetVersionDescriptor extends GitVersionDescriptor {
    /**
    * Version string identifier (name of tag/branch, SHA1 of commit)
    */
    targetVersion: string;
    /**
    * Version options - Specify additional modifiers to version (e.g Previous)
    */
    targetVersionOptions: GitVersionOptions;
    /**
    * Version type (branch, tag, or commit). Determines how Id is interpreted
    */
    targetVersionType: GitVersionType;
}
export interface GitTreeEntryRef {
    /**
    * Blob or tree
    */
    gitObjectType: GitObjectType;
    /**
    * Mode represented as octal string
    */
    mode: string;
    /**
    * SHA1 hash of git object
    */
    objectId: string;
    /**
    * Path relative to parent tree object
    */
    relativePath: string;
    /**
    * Size of content
    */
    size: number;
    /**
    * url to retrieve tree or blob
    */
    url: string;
}
export interface GitTreeRef {
    _links: any;
    /**
    * SHA1 hash of git object
    */
    objectId: string;
    /**
    * Sum of sizes of all children
    */
    size: number;
    /**
    * Blobs and trees under this tree
    */
    treeEntries: GitTreeEntryRef[];
    /**
    * Url to tree
    */
    url: string;
}
export interface GitUserDate {
    date: Date;
    email: string;
    name: string;
}
export interface GitVersionDescriptor {
    /**
    * Version string identifier (name of tag/branch/index, SHA1 of commit)
    */
    version: string;
    /**
    * Version options - Specify additional modifiers to version (e.g Previous)
    */
    versionOptions: GitVersionOptions;
    /**
    * Version type (branch, tag, commit, or index). Determines how Id is interpreted
    */
    versionType: GitVersionType;
}
export declare enum GitVersionOptions {
    /**
    * Not specified
    */
    None = 0,
    /**
    * Commit that changed item prior to the current version
    */
    PreviousChange = 1,
    /**
    * First parent of commit (HEAD^)
    */
    FirstParent = 2,
}
export declare enum GitVersionType {
    /**
    * Interpret the version as a branch name
    */
    Branch = 0,
    /**
    * Interpret the version as a tag name
    */
    Tag = 1,
    /**
    * Interpret the version as a commit ID (SHA1)
    */
    Commit = 2,
    /**
    * Interpret the version as an index name
    */
    Index = 3,
}
export interface HistoryEntry<T> {
    /**
    * The Change list (changeset/commit/shelveset) for this point in history
    */
    changeList: ChangeList<T>;
    /**
    * The change made to the item from this change list (only relevant for File history, not folders)
    */
    itemChangeType: VersionControlChangeType;
    /**
    * The path of the item at this point in history (only relevant for File history, not folders)
    */
    serverItem: string;
}
export interface HistoryQueryResults<T> {
    /**
    * True if there are more results available to fetch (we're returning the max # of items requested) A more RESTy solution would be to include a Link header
    */
    moreResultsAvailable: boolean;
    /**
    * The history entries (results) from this query
    */
    results: HistoryEntry<T>[];
}
export interface IdentityRefWithVote extends VSS_Common_Contracts.IdentityRef {
    isRequired: boolean;
    reviewerUrl: string;
    vote: number;
    votedFor: IdentityRefWithVote[];
}
export interface IncludedGitCommit {
    commitId: string;
    commitTime: Date;
    parentCommitIds: string[];
    repositoryId: string;
}
export interface ItemContent {
    content: string;
    contentType: ItemContentType;
}
export declare enum ItemContentType {
    RawText = 0,
    Base64Encoded = 1,
}
/**
* Optional details to include when returning an item model
*/
export interface ItemDetailsOptions {
    /**
    * If true, include metadata about the file type
    */
    includeContentMetadata: boolean;
    /**
    * Specifies whether to include children (OneLevel), all descendants (Full) or None for folder items
    */
    recursionLevel: VersionControlRecursionType;
}
export interface ItemModel {
    _links: any;
    contentMetadata: FileContentMetadata;
    isFolder: boolean;
    isSymLink: boolean;
    path: string;
    url: string;
}
export declare enum PullRequestAsyncStatus {
    NotSet = 0,
    Queued = 1,
    Conflicts = 2,
    Succeeded = 3,
    RejectedByPolicy = 4,
    Failure = 5,
}
export declare enum PullRequestStatus {
    NotSet = 0,
    Active = 1,
    Abandoned = 2,
    Completed = 3,
}
export interface TfvcBranch extends TfvcBranchRef {
    children: TfvcBranch[];
    mappings: TfvcBranchMapping[];
    parent: TfvcShallowBranchRef;
    relatedBranches: TfvcShallowBranchRef[];
}
export interface TfvcBranchMapping {
    depth: string;
    serverItem: string;
    type: string;
}
export interface TfvcBranchRef extends TfvcShallowBranchRef {
    _links: any;
    createdDate: Date;
    description: string;
    isDeleted: boolean;
    owner: VSS_Common_Contracts.IdentityRef;
    url: string;
}
export interface TfvcChange extends Change<TfvcItem> {
    /**
    * List of merge sources in case of rename or branch creation.
    */
    mergeSources: TfvcMergeSource[];
    /**
    * Version at which a (shelved) change was pended against
    */
    pendingVersion: number;
}
export interface TfvcChangeset extends TfvcChangesetRef {
    accountId: string;
    changes: TfvcChange[];
    checkinNotes: CheckinNote[];
    collectionId: string;
    hasMoreChanges: boolean;
    policyOverride: TfvcPolicyOverrideInfo;
    workItems: AssociatedWorkItem[];
}
export interface TfvcChangesetRef {
    _links: any;
    author: VSS_Common_Contracts.IdentityRef;
    changesetId: number;
    checkedInBy: VSS_Common_Contracts.IdentityRef;
    comment: string;
    commentTruncated: boolean;
    createdDate: Date;
    url: string;
}
/**
* Criteria used in a search for change lists
*/
export interface TfvcChangesetSearchCriteria {
    /**
    * Alias or display name of user who made the changes
    */
    author: string;
    /**
    * Whether or not to follow renames for the given item being queried
    */
    followRenames: boolean;
    /**
    * If provided, only include changesets created after this date (string) Think of a better name for this.
    */
    fromDate: string;
    /**
    * If provided, only include changesets after this changesetID
    */
    fromId: number;
    /**
    * Whether to include the _links field on the shallow references
    */
    includeLinks: boolean;
    /**
    * Path of item to search under
    */
    path: string;
    /**
    * If provided, only include changesets created before this date (string) Think of a better name for this.
    */
    toDate: string;
    /**
    * If provided, a version descriptor for the latest change list to include
    */
    toId: number;
}
export interface TfvcChangesetsRequestData {
    changesetIds: number[];
    commentLength: number;
    /**
    * Whether to include the _links field on the shallow references
    */
    includeLinks: boolean;
}
export interface TfvcCheckinEventData {
    changeset: TfvcChangeset;
    project: TFS_Core_Contracts.TeamProjectReference;
}
export interface TfvcHistoryEntry extends HistoryEntry<TfvcItem> {
    /**
    * The encoding of the item at this point in history (only relevant for File history, not folders)
    */
    encoding: number;
    /**
    * The file id of the item at this point in history (only relevant for File history, not folders)
    */
    fileId: number;
}
export interface TfvcItem extends ItemModel {
    changeDate: Date;
    deletionId: number;
    isBranch: boolean;
    isPendingChange: boolean;
    version: number;
}
/**
* Item path and Version descriptor properties
*/
export interface TfvcItemDescriptor {
    path: string;
    recursionLevel: VersionControlRecursionType;
    version: string;
    versionOption: TfvcVersionOption;
    versionType: TfvcVersionType;
}
export interface TfvcItemRequestData {
    /**
    * If true, include metadata about the file type
    */
    includeContentMetadata: boolean;
    /**
    * Whether to include the _links field on the shallow references
    */
    includeLinks: boolean;
    itemDescriptors: TfvcItemDescriptor[];
}
export interface TfvcLabel extends TfvcLabelRef {
    items: TfvcItem[];
}
export interface TfvcLabelRef {
    _links: any;
    description: string;
    id: number;
    labelScope: string;
    modifiedDate: Date;
    name: string;
    owner: VSS_Common_Contracts.IdentityRef;
    url: string;
}
export interface TfvcLabelRequestData {
    /**
    * Whether to include the _links field on the shallow references
    */
    includeLinks: boolean;
    itemLabelFilter: string;
    labelScope: string;
    maxItemCount: number;
    name: string;
    owner: string;
}
export interface TfvcMergeSource {
    /**
    * Indicates if this a rename source. If false, it is a merge source.
    */
    isRename: boolean;
    /**
    * The server item of the merge source
    */
    serverItem: string;
    /**
    * Start of the version range
    */
    versionFrom: number;
    /**
    * End of the version range
    */
    versionTo: number;
}
export interface TfvcPolicyFailureInfo {
    message: string;
    policyName: string;
}
export interface TfvcPolicyOverrideInfo {
    comment: string;
    policyFailures: TfvcPolicyFailureInfo[];
}
export interface TfvcShallowBranchRef {
    path: string;
}
export interface TfvcShelveset extends TfvcShelvesetRef {
    changes: TfvcChange[];
    notes: CheckinNote[];
    policyOverride: TfvcPolicyOverrideInfo;
    workItems: AssociatedWorkItem[];
}
export interface TfvcShelvesetRef {
    _links: any;
    comment: string;
    commentTruncated: boolean;
    createdDate: Date;
    id: string;
    name: string;
    owner: VSS_Common_Contracts.IdentityRef;
    url: string;
}
export interface TfvcShelvesetRequestData {
    /**
    * Whether to include policyOverride and notes
    */
    includeDetails: boolean;
    /**
    * Whether to include the _links field on the shallow references
    */
    includeLinks: boolean;
    /**
    * Whether to include workItems
    */
    includeWorkItems: boolean;
    /**
    * Max number of changes to include
    */
    maxChangeCount: number;
    /**
    * Max length of comment
    */
    maxCommentLength: number;
    /**
    * Shelveset's name
    */
    name: string;
    /**
    * Owner's ID. Could be a name or a guid.
    */
    owner: string;
}
export interface TfvcVersionDescriptor {
    version: string;
    versionOption: TfvcVersionOption;
    versionType: TfvcVersionType;
}
export declare enum TfvcVersionOption {
    None = 0,
    Previous = 1,
    UseRename = 2,
}
export declare enum TfvcVersionType {
    None = 0,
    Changeset = 1,
    Shelveset = 2,
    Change = 3,
    Date = 4,
    Latest = 5,
    Tip = 6,
    MergeSource = 7,
}
export interface UpdateRefsRequest {
    refUpdateRequests: GitRefUpdate[];
    updateMode: GitRefUpdateMode;
}
export declare enum VersionControlChangeType {
    None = 0,
    Add = 1,
    Edit = 2,
    Encoding = 4,
    Rename = 8,
    Delete = 16,
    Undelete = 32,
    Branch = 64,
    Merge = 128,
    Lock = 256,
    Rollback = 512,
    SourceRename = 1024,
    TargetRename = 2048,
    Property = 4096,
    All = 8191,
}
export interface VersionControlProjectInfo {
    project: TFS_Core_Contracts.TeamProjectReference;
    supportsGit: boolean;
    supportsTFVC: boolean;
}
export declare enum VersionControlRecursionType {
    None = 0,
    OneLevel = 1,
    Full = 120,
}
export declare var TypeInfo: {
    AssociatedWorkItem: {
        fields: any;
    };
    Change: {
        fields: any;
    };
    ChangeCountDictionary: {
        fields: any;
    };
    ChangeList: {
        fields: any;
    };
    ChangeListSearchCriteria: {
        fields: any;
    };
    CheckinNote: {
        fields: any;
    };
    FileContentMetadata: {
        fields: any;
    };
    GitBaseVersionDescriptor: {
        fields: any;
    };
    GitBlobRef: {
        fields: any;
    };
    GitBranchStats: {
        fields: any;
    };
    GitChange: {
        fields: any;
    };
    GitCommit: {
        fields: any;
    };
    GitCommitChanges: {
        fields: any;
    };
    GitCommitDiffs: {
        fields: any;
    };
    GitCommitRef: {
        fields: any;
    };
    GitCommitToCreate: {
        fields: any;
    };
    GitHistoryQueryResults: {
        fields: any;
    };
    GitItem: {
        fields: any;
    };
    GitItemDescriptor: {
        fields: any;
    };
    GitItemRequestData: {
        fields: any;
    };
    GitMediaObjectRef: {
        fields: any;
    };
    GitObjectType: {
        enumValues: {
            "bad": number;
            "commit": number;
            "tree": number;
            "blob": number;
            "tag": number;
            "ext2": number;
            "ofsDelta": number;
            "refDelta": number;
        };
    };
    GitPathAction: {
        fields: any;
    };
    GitPathActions: {
        enumValues: {
            "none": number;
            "edit": number;
            "delete": number;
            "add": number;
            "rename": number;
        };
    };
    GitPullRequest: {
        fields: any;
    };
    GitPullRequestSearchCriteria: {
        fields: any;
    };
    GitPush: {
        fields: any;
    };
    GitPushEventData: {
        fields: any;
    };
    GitPushRef: {
        fields: any;
    };
    GitPushSearchCriteria: {
        fields: any;
    };
    GitQueryCommitsCriteria: {
        fields: any;
    };
    GitRef: {
        fields: any;
    };
    GitRefUpdate: {
        fields: any;
    };
    GitRefUpdateMode: {
        enumValues: {
            "bestEffort": number;
            "allOrNone": number;
        };
    };
    GitRefUpdateResult: {
        fields: any;
    };
    GitRefUpdateResultSet: {
        fields: any;
    };
    GitRefUpdateStatus: {
        enumValues: {
            "succeeded": number;
            "forcePushRequired": number;
            "staleOldObjectId": number;
            "invalidRefName": number;
            "unprocessed": number;
            "unresolvableToCommit": number;
            "writePermissionRequired": number;
            "manageNotePermissionRequired": number;
            "createBranchPermissionRequired": number;
            "createTagPermissionRequired": number;
            "rejectedByPlugin": number;
            "locked": number;
            "refNameConflict": number;
            "rejectedByPolicy": number;
            "succeededNonExistentRef": number;
            "succeededCorruptRef": number;
        };
    };
    GitRepository: {
        fields: any;
    };
    GitTargetVersionDescriptor: {
        fields: any;
    };
    GitTreeEntryRef: {
        fields: any;
    };
    GitTreeRef: {
        fields: any;
    };
    GitUserDate: {
        fields: any;
    };
    GitVersionDescriptor: {
        fields: any;
    };
    GitVersionOptions: {
        enumValues: {
            "none": number;
            "previousChange": number;
            "firstParent": number;
        };
    };
    GitVersionType: {
        enumValues: {
            "branch": number;
            "tag": number;
            "commit": number;
            "index": number;
        };
    };
    HistoryEntry: {
        fields: any;
    };
    HistoryQueryResults: {
        fields: any;
    };
    IdentityRefWithVote: {
        fields: any;
    };
    IncludedGitCommit: {
        fields: any;
    };
    ItemContent: {
        fields: any;
    };
    ItemContentType: {
        enumValues: {
            "rawText": number;
            "base64Encoded": number;
        };
    };
    ItemDetailsOptions: {
        fields: any;
    };
    ItemModel: {
        fields: any;
    };
    PullRequestAsyncStatus: {
        enumValues: {
            "notSet": number;
            "queued": number;
            "conflicts": number;
            "succeeded": number;
            "rejectedByPolicy": number;
            "failure": number;
        };
    };
    PullRequestStatus: {
        enumValues: {
            "notSet": number;
            "active": number;
            "abandoned": number;
            "completed": number;
        };
    };
    TfvcBranch: {
        fields: any;
    };
    TfvcBranchMapping: {
        fields: any;
    };
    TfvcBranchRef: {
        fields: any;
    };
    TfvcChange: {
        fields: any;
    };
    TfvcChangeset: {
        fields: any;
    };
    TfvcChangesetRef: {
        fields: any;
    };
    TfvcChangesetSearchCriteria: {
        fields: any;
    };
    TfvcChangesetsRequestData: {
        fields: any;
    };
    TfvcCheckinEventData: {
        fields: any;
    };
    TfvcHistoryEntry: {
        fields: any;
    };
    TfvcItem: {
        fields: any;
    };
    TfvcItemDescriptor: {
        fields: any;
    };
    TfvcItemRequestData: {
        fields: any;
    };
    TfvcLabel: {
        fields: any;
    };
    TfvcLabelRef: {
        fields: any;
    };
    TfvcLabelRequestData: {
        fields: any;
    };
    TfvcMergeSource: {
        fields: any;
    };
    TfvcPolicyFailureInfo: {
        fields: any;
    };
    TfvcPolicyOverrideInfo: {
        fields: any;
    };
    TfvcShallowBranchRef: {
        fields: any;
    };
    TfvcShelveset: {
        fields: any;
    };
    TfvcShelvesetRef: {
        fields: any;
    };
    TfvcShelvesetRequestData: {
        fields: any;
    };
    TfvcVersionDescriptor: {
        fields: any;
    };
    TfvcVersionOption: {
        enumValues: {
            "none": number;
            "previous": number;
            "useRename": number;
        };
    };
    TfvcVersionType: {
        enumValues: {
            "none": number;
            "changeset": number;
            "shelveset": number;
            "change": number;
            "date": number;
            "latest": number;
            "tip": number;
            "mergeSource": number;
        };
    };
    UpdateRefsRequest: {
        fields: any;
    };
    VersionControlChangeType: {
        enumValues: {
            "none": number;
            "add": number;
            "edit": number;
            "encoding": number;
            "rename": number;
            "delete": number;
            "undelete": number;
            "branch": number;
            "merge": number;
            "lock": number;
            "rollback": number;
            "sourceRename": number;
            "targetRename": number;
            "property": number;
            "all": number;
        };
    };
    VersionControlProjectInfo: {
        fields: any;
    };
    VersionControlRecursionType: {
        enumValues: {
            "none": number;
            "oneLevel": number;
            "full": number;
        };
    };
};
