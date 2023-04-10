import { IPmcData } from "../models/eft/common/IPmcData";
import { Stats } from "../models/eft/common/tables/IBotBase";
import { IAkiProfile } from "../models/eft/profile/IAkiProfile";
import { IValidateNicknameRequestData } from "../models/eft/profile/IValidateNicknameRequestData";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { ProfileSnapshotService } from "../services/ProfileSnapshotService";
import { JsonUtil } from "../utils/JsonUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { Watermark } from "../utils/Watermark";
import { ItemHelper } from "./ItemHelper";
export declare class ProfileHelper {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected watermark: Watermark;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected profileSnapshotService: ProfileSnapshotService;
    constructor(logger: ILogger, jsonUtil: JsonUtil, watermark: Watermark, timeUtil: TimeUtil, saveServer: SaveServer, databaseServer: DatabaseServer, itemHelper: ItemHelper, profileSnapshotService: ProfileSnapshotService);
    /**
     * Remove/reset started quest condtions in player profile
     * @param sessionID Session id
     * @param conditionIds Condition ids that need to be reset/removed
     */
    resetProfileQuestCondition(sessionID: string, conditionIds: string[]): void;
    /**
     * Get all profiles from server
     * @returns Dictionary of profiles
     */
    getProfiles(): Record<string, IAkiProfile>;
    getCompleteProfile(sessionID: string): IPmcData[];
    /**
     * Fix xp doubling on post-raid xp reward screen by sending a 'dummy' profile to the post-raid screen
     * Server saves the post-raid changes prior to the xp screen getting the profile, this results in the xp screen using
     * the now updated profile values as a base, meaning it shows x2 xp gained
     * Instead, clone the post-raid profile (so we dont alter its values), apply the pre-raid xp values to the cloned objects and return
     * Delete snapshot of pre-raid profile prior to returning profile data
     * @param sessionId Session id
     * @param output pmc and scav profiles array
     * @param pmcProfile post-raid pmc profile
     * @param scavProfile post-raid scav profile
     * @returns updated profile array
     */
    protected postRaidXpWorkaroundFix(sessionId: string, output: IPmcData[], pmcProfile: IPmcData, scavProfile: IPmcData): IPmcData[];
    isNicknameTaken(info: IValidateNicknameRequestData, sessionID: string): boolean;
    /**
     * Add experience to a PMC inside the players profile
     * @param sessionID Session id
     * @param experienceToAdd Experience to add to PMC character
     */
    addExperienceToPmc(sessionID: string, experienceToAdd: number): void;
    getProfileByPmcId(pmcId: string): IPmcData;
    getExperience(level: number): number;
    getMaxLevel(): number;
    getDefaultAkiDataObject(): any;
    getFullProfile(sessionID: string): IAkiProfile;
    getPmcProfile(sessionID: string): IPmcData;
    getScavProfile(sessionID: string): IPmcData;
    getDefaultCounters(): Stats;
    protected isWiped(sessionID: string): boolean;
    protected getServerVersion(): string;
    /**
     * Iterate over player profile inventory items and find the secure container and remove it
     * @param profile Profile to remove secure container from
     * @returns profile without secure container
     */
    removeSecureContainer(profile: IPmcData): IPmcData;
}
