"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeleportMarkItem = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	TeleportMarkItemView_1 = require("../MarkItemView/TeleportMarkItemView"),
	ConfigMarkItem_1 = require("./ConfigMarkItem");
class TeleportMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
	constructor(e, t, n, i, r, a = 1) {
		super(e, t, n, i, r, a),
			(this.IsSelectThisFloor = !1),
			(this.InnerView = void 0),
			(this.IsDirty = !1),
			(this.rHs = void 0),
			(this.Dwn = (e) => {
				var t;
				2 === this.MapType &&
					((t = this.MarkMultiMapId === e), this.IsSelectThisFloor !== t) &&
					((this.IsSelectThisFloor = this.MarkMultiMapId === e),
					this.InnerView?.OnIconPathChanged(this.IconPath));
			}),
			(this.WDi = (e) => {
				this.InnerView?.IsShowOrShowing &&
					this.InnerView?.OnMarkItemStateChange(e);
			}),
			(this.uDi = (e) => {
				this.MarkConfig.MarkId === e &&
					(this.cDi(), this.View?.OnIconPathChanged(this.IconPath));
			});
	}
	get IsFogUnlock() {
		return (
			(6 === this.MarkConfig.ObjectType && !this.IsLocked) || super.IsFogUnlock
		);
	}
	get IsLocked() {
		return !ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(
			this.MarkConfig.MarkId,
		);
	}
	Initialize() {
		super.Initialize(),
			this.cDi(),
			this.AddEventListener(),
			this.UpdateMultiMapFloorSelectState(!0);
	}
	OnCreateView() {
		this.InnerView = new TeleportMarkItemView_1.TeleportMarkItemView(this);
	}
	OnDestroy() {
		super.OnDestroy(), (this.rHs = void 0), this.RemoveEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UnlockTeleport,
			this.uDi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnMarkItemShowStateChange,
				this.WDi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapSelectMultiMap,
				this.Dwn,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UnlockTeleport,
			this.uDi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnMarkItemShowStateChange,
				this.WDi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapSelectMultiMap,
				this.Dwn,
			);
	}
	LogicUpdate(e) {
		super.LogicUpdate(e), this.UpdateMultiMapFloorSelectState();
	}
	ViewUpdate(e, t = !1, n = !1) {
		super.ViewUpdate(e, t, n), this.oHs();
	}
	oHs() {
		1 === this.MapType &&
			this.rHs !== this.IsLocked &&
			((this.rHs = this.IsLocked),
			this.cDi(),
			this.View?.OnIconPathChanged(this.IconPath));
	}
	UpdateMultiMapFloorSelectState(e = !1) {
		var t, n;
		(2 === this.MapType && !e) ||
			((e = this.IsSelectThisFloor),
			this.IsMultiMapTeleport &&
			((t = ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId()),
			(n = ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigById(
				this.MarkMultiMapId,
			))) &&
			n.Area.includes(t)
				? (this.IsSelectThisFloor = !0)
				: (this.IsSelectThisFloor = !1),
			e === this.IsSelectThisFloor) ||
			(this.IsDirty = !0);
	}
	cDi() {
		this.IconPath = this.IsLocked
			? this.MarkConfig.LockMarkPic
			: this.MarkConfig.UnlockMarkPic;
	}
	get IsActivity() {
		return 13 === this.MarkConfig.ObjectType;
	}
	get IsDungeonEntrance() {
		return (
			2 === this.MarkConfig.RelativeType ||
			ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdLinkDungeonEntrance(
				this.MarkConfigId,
			)
		);
	}
	get IsTowerEntrance() {
		return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsTowerEntrance(
			this.MarkConfigId,
		);
	}
	get IsRoguelike() {
		return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsRoguelike(
			this.MarkConfigId,
		);
	}
	get IsMultiMapTeleport() {
		return 0 !== this.MarkConfig.MultiMapFloorId;
	}
	get MarkMultiMapId() {
		return this.MarkConfig.MultiMapFloorId;
	}
}
exports.TeleportMarkItem = TeleportMarkItem;
