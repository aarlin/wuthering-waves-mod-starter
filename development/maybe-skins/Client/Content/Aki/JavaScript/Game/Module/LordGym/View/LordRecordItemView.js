"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoadRecordItemView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid"),
	EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class LoadRecordItemView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.Nke = void 0),
			(this.uEi = () => new RoleItem());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIHorizontalLayout],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UITexture],
		]),
			(this.BtnBindInfo = []);
	}
	OnStart() {
		this.Nke = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(3),
			this.uEi,
		);
	}
	Clear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	Refresh(e, t, i) {
		var o,
			r,
			n,
			a = e.MonsterList[0];
		a
			? ((o =
					ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterBigIcon(a)),
				this.SetTextureByPath(o, this.GetTexture(7)),
				(o = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(a)),
				this.GetText(0).SetText(o),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(1),
					"Text_InstanceDungeonRecommendLevel_Text",
					e.MonsterLevel.toString(),
				),
				(a = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(e.Id)),
				(o = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(e.Id)),
				this.GetItem(5).SetUIActive(!a || !o),
				(n =
					void 0 !==
					(r = ModelManager_1.ModelManager.LordGymModel.LordGymRecord.get(
						e.Id,
					))),
				this.GetText(2).SetUIActive(n && a),
				this.GetText(4).SetUIActive(!n && a && o),
				this.Nke.SetActive(n),
				a &&
					n &&
					(this.GetText(2)?.SetText(TimeUtil_1.TimeUtil.GetTimeString(r.EAs)),
					this.Nke.RefreshByData(this.cEi(r))))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("SceneGameplay", 50, "领主挑战缺少对应怪物配置", [
					"id",
					e.Id,
				]);
	}
	cEi(e) {
		var t = Array(EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM);
		for (let i = 0; i < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; i++)
			t[i] = e.xkn[i] ?? { RoleId: -1, Level: 1 };
		return t;
	}
	GetKey(e, t) {
		return this.GridIndex;
	}
}
exports.LoadRecordItemView = LoadRecordItemView;
class RoleItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	constructor() {
		super(...arguments), (this.mEi = void 0);
	}
	async OnCreateAsync() {
		var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
			"UiItem_ItemBNoneRole",
		);
		e = await this.LoadPrefabAsync(e, this.RootItem);
		this.mEi = e.GetComponentByClass(UE.UIItem.StaticClass());
	}
	OnRefresh(e, t, i) {
		var o,
			r = e.l3n;
		!r || r < 0
			? (this.Apply({ Type: 1 }), this.mEi?.SetUIActive(!0))
			: (this.mEi?.SetUIActive(!1),
				(r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r)),
				(o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"Text_InstanceDungeonRecommendLevel_Text",
				)),
				(o = StringUtils_1.StringUtils.Format(o, e.r3n.toString())),
				(e = {
					Data: e,
					ElementId: r.ElementId,
					Type: 2,
					ItemConfigId: r.Id,
					BottomText: o,
					QualityId: r.QualityId,
				}),
				this.Apply(e));
	}
}
