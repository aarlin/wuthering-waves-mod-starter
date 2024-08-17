"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExitSkillItem = exports.ExitSkillItemData = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	EditFormationDefine_1 = require("../../EditFormationDefine");
class ExitSkillItemData {
	constructor() {
		(this.RoleId = void 0),
			(this.OnlineIndex = void 0),
			(this.PlayerId = void 0);
	}
}
exports.ExitSkillItemData = ExitSkillItemData;
class ExitSkillItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.zke = void 0),
			(this.j8 = void 0),
			(this.R4t = !1),
			(this.EPe = void 0),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UITexture],
			[4, UE.UITexture],
			[3, UE.UITexture],
			[5, UE.UISprite],
			[6, UE.UIItem],
			[7, UE.UISprite],
			[8, UE.UIText],
			[9, UE.UIItem],
			[10, UE.UIText],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIHorizontalLayout],
			[14, UE.UIItem],
			[15, UE.UIText],
		];
	}
	OnStart() {
		this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
	}
	OnBeforeDestroy() {
		(this.zke = void 0),
			(this.j8 = void 0),
			(this.R4t = !1),
			this.EPe?.Clear(),
			(this.EPe = void 0);
	}
	Refresh(e, t) {
		var i = e?.RoleId,
			r = e?.PlayerId;
		i ? this.U4t(i, e.OnlineIndex, r, t) : this.A4t(!1);
		let l = !1;
		!this.R4t || (this.zke === i && this.j8 === r) || (l = !0),
			(this.zke = i),
			(this.j8 = r),
			(this.R4t = !0),
			l && this.EPe.PlayLevelSequenceByName("Switch");
	}
	U4t(e, t, i, r) {
		var l = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
		if (l) {
			this.A4t(!0);
			var o = l.FormationRoleCard;
			o =
				(this.SetRoleIcon(o, this.GetTexture(2), e),
				this.SetRoleIcon(o, this.GetTexture(3), e),
				this.SetRoleIcon(o, this.GetTexture(4), e),
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(l.SkillId));
			let a;
			for (const e of o)
				if (e.SkillType === EditFormationDefine_1.EXIT_SKILL_TYPE) {
					a = e;
					break;
				}
			if (
				(a &&
					(this.SetSpriteByPath(a.Icon, this.GetSprite(7), !1),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), a.SkillName),
					r
						? LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(10),
								a.MultiSkillDescribe,
								...a.MultiSkillDetailNum,
							)
						: LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(10),
								a.SkillDescribe,
								...a.SkillDetailNum,
							)),
				t)
			) {
				let r;
				this.GetSprite(5).SetUIActive(!0),
					(r =
						i === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
							? EditFormationDefine_1.SELF_ONLINE_INDEX
							: EditFormationDefine_1.OTHER_ONLINE_INDEX),
					(e = StringUtils_1.StringUtils.Format(r, t.toString())),
					(l =
						ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
					this.SetSpriteByPath(l, this.GetSprite(5), !1);
			} else this.GetSprite(5).SetUIActive(!1);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Formation", 49, "ExitSkillItem,找不到角色配置");
	}
	A4t(e) {
		this.GetItem(0).SetUIActive(e),
			this.GetItem(1).SetUIActive(e),
			this.GetItem(6).SetUIActive(!e),
			this.GetSprite(7).SetUIActive(e),
			this.GetItem(11).SetUIActive(e),
			this.GetItem(12).SetUIActive(e),
			this.GetText(8).SetUIActive(e),
			this.GetText(10).SetUIActive(e);
		var t = this.GetText(15);
		t.SetUIActive(!e),
			e || LguiUtil_1.LguiUtil.SetLocalText(t, "EditBattleTeamEmpty");
	}
}
exports.ExitSkillItem = ExitSkillItem;
