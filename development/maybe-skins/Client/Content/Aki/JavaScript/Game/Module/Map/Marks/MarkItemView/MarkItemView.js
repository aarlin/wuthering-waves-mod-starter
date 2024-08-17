"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkItemView = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	MarkChildIconComponent_1 = require("./Components/MarkChildIconComponent"),
	MarkNameComponent_1 = require("./Components/MarkNameComponent"),
	MarkOutOfBoundComponent_1 = require("./Components/MarkOutOfBoundComponent"),
	MarkRangeImageComponent_1 = require("./Components/MarkRangeImageComponent"),
	MarkSelectComponent_1 = require("./Components/MarkSelectComponent"),
	MarkTrackComponent_1 = require("./Components/MarkTrackComponent"),
	MarkVerticalPointerComponent_1 = require("./Components/MarkVerticalPointerComponent"),
	POINTER_RANGE = 2e3;
class MarkItemView extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Holder = void 0),
			(this.IsSelectedInternal = !1),
			(this.IsShowIcon = !0),
			(this.pDi = void 0),
			(this.LevelSequencePlayer = void 0),
			(this.OutOfBoundComponentInternal = void 0),
			(this.SelectComponentInternal = void 0),
			(this.TrackComponentInternal = void 0),
			(this.RangeComponentInternal = void 0),
			(this.NameComponentInternal = void 0),
			(this.VerticalPointerComponentInternal = void 0),
			(this.ChildIconComponentInternal = void 0),
			(this.vDi = void 0),
			(this.MDi = void 0),
			(this.SDi = void 0),
			(this.IHs = void 0),
			(this.EDi = void 0),
			(this.yDi = !1),
			(this.IDi = void 0),
			(this.TDi = void 0),
			(this.LDi = void 0),
			(this.DDi = void 0),
			(this.RDi = void 0),
			(this.UDi = void 0),
			(this.ADi = void 0),
			(this.PDi = !1),
			(this.xDi = !1),
			(this.wDi = void 0),
			(this.BDi = 0),
			(this.OnLevelSequenceStart = (e) => {
				this.Holder.OnLevelSequenceStart(e);
			}),
			(this.OnLevelSequenceStop = (e) => {
				this.Holder.OnLevelSequenceStop(e),
					"HideView" === e &&
						((e = this.Holder.IsCanShowView),
						this.SetUiActive(e),
						this.SDi?.SetAlpha(1));
			}),
			(this.Holder = e),
			(this.pDi = new UE.Vector());
	}
	get LoadingPromise() {
		return this.vDi;
	}
	get IsSelected() {
		return this.IsSelectedInternal;
	}
	set IsSelected(e) {
		this.IsSelectedInternal !== e &&
			((this.IsSelectedInternal = e), this.OnSelectedStateChange(e));
	}
	async GetNameComponentAsync() {
		return (
			this.NameComponentInternal ||
				(this.NameComponentInternal =
					new MarkNameComponent_1.MarkNameComponent()),
			this.IDi ||
				((this.IDi = this.NameComponentInternal.CreateThenShowByResourceIdAsync(
					"UiItem_MarkMapName_Prefab",
					this.SDi,
					!0,
				)),
				this.AddChild(this.NameComponentInternal)),
			await this.IDi,
			this.NameComponentInternal
		);
	}
	async GetRangeComponentAsync() {
		return (
			this.RangeComponentInternal ||
				(this.RangeComponentInternal =
					new MarkRangeImageComponent_1.MarkRangeImageComponent()),
			this.TDi ||
				((this.TDi =
					this.RangeComponentInternal.CreateThenShowByResourceIdAsync(
						"UiItem_MarkArea_Prefab",
						this.SDi,
						!0,
					)),
				this.AddChild(this.RangeComponentInternal)),
			await this.TDi,
			this.RangeComponentInternal
		);
	}
	async GetOutOfBoundComponentAsync() {
		return (
			this.OutOfBoundComponentInternal ||
				(this.OutOfBoundComponentInternal =
					new MarkOutOfBoundComponent_1.MarkOutOfBoundComponent()),
			this.LDi ||
				((this.LDi =
					this.OutOfBoundComponentInternal.CreateThenShowByResourceIdAsync(
						"UiItem_MarkOut_Prefab",
						this.SDi,
						!0,
					)),
				this.AddChild(this.OutOfBoundComponentInternal)),
			await this.LDi,
			this.OutOfBoundComponentInternal
		);
	}
	async GetSelectComponentAsync() {
		return (
			this.SelectComponentInternal ||
				(this.SelectComponentInternal =
					new MarkSelectComponent_1.MarkSelectComponent()),
			this.DDi ||
				((this.DDi =
					this.SelectComponentInternal.CreateThenShowByResourceIdAsync(
						"UiItem_MarkChoose_Prefab",
						this.SDi,
						!0,
					)),
				this.AddChild(this.SelectComponentInternal)),
			await this.DDi,
			this.SelectComponentInternal
		);
	}
	async GetTrackComponentAsync() {
		return (
			this.TrackComponentInternal ||
				((this.TrackComponentInternal =
					new MarkTrackComponent_1.MarkTrackComponent()),
				(this.TrackComponentInternal.MapType = this.Holder.MapType)),
			this.RDi ||
				((this.RDi =
					this.TrackComponentInternal.CreateThenShowByResourceIdAsync(
						"UiItem_MarkTrackNia_Prefab",
						this.SDi,
						!0,
					)),
				this.AddChild(this.TrackComponentInternal)),
			await this.RDi,
			this.TrackComponentInternal
		);
	}
	async GetVerticalPointerComponentAsync() {
		return (
			this.VerticalPointerComponentInternal ||
				(this.VerticalPointerComponentInternal =
					new MarkVerticalPointerComponent_1.MarkVerticalPointerComponent()),
			this.UDi ||
				((this.UDi =
					this.VerticalPointerComponentInternal.CreateThenShowByResourceIdAsync(
						"UiItem_MarkArrow_Prefab",
						this.SDi,
						!0,
					)),
				this.AddChild(this.VerticalPointerComponentInternal)),
			await this.UDi,
			this.VerticalPointerComponentInternal
		);
	}
	async GetChildIconComponentAsync() {
		return (
			this.ChildIconComponentInternal ||
				(this.ChildIconComponentInternal =
					new MarkChildIconComponent_1.MarkChildIconComponent()),
			this.ADi ||
				((this.ADi =
					this.ChildIconComponentInternal.CreateThenShowByResourceIdAsync(
						"UiItem_MarkChildNode_Prefab",
						this.SDi,
						!0,
					)),
				this.AddChild(this.ChildIconComponentInternal)),
			await this.ADi,
			this.ChildIconComponentInternal
		);
	}
	async InitializeMarkItemViewAsync() {
		(this.vDi = this.CreateThenShowByResourceIdAsync(
			"UiItem_WorldMapMark_Prefab",
			this.Holder.ViewRoot,
			!0,
		)),
			await this.vDi,
			this.bDi(this.yDi);
	}
	OnSelectedStateChange(e) {}
	OnInitialize() {}
	GetIconItem() {
		return this.GetSprite(1);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UIItem],
		];
	}
	OnStart() {
		GlobalData_1.GlobalData.IsPlayInEditor &&
			this.RootActor.SetActorLabel(
				`MarkId:${this.Holder.MarkId},ShowPriority:` + this.Holder.ShowPriority,
			);
		var e = this.RootItem.GetAttachSocketName(),
			t = this.RootItem.GetAttachParent();
		(this.IHs = t.GetSocketTransform(e)),
			(this.SDi = this.GetItem(0)),
			(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.RootItem,
			)),
			this.LevelSequencePlayer.BindSequenceStartEvent(
				this.OnLevelSequenceStart,
			),
			this.LevelSequencePlayer.BindSequenceCloseEvent(this.OnLevelSequenceStop),
			this.GetSprite(1).SetUIActive(!1),
			(t = new UE.Vector(this.Holder.ConfigScale));
		this.GetSprite(1).SetUIItemScale(t),
			this.SetScale(this.Holder.MarkScale),
			this.OnInitialize(),
			void 0 !== this.EDi && (this.EDi(), (this.EDi = void 0)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnMarkItemViewCreate,
				this,
			);
	}
	OnBeforeDestroy() {
		(this.OutOfBoundComponentInternal = void 0),
			(this.SelectComponentInternal = void 0),
			(this.TrackComponentInternal = void 0),
			(this.RangeComponentInternal = void 0),
			(this.NameComponentInternal = void 0),
			(this.VerticalPointerComponentInternal = void 0),
			(this.ChildIconComponentInternal = void 0),
			this.LevelSequencePlayer?.Clear(),
			(this.LevelSequencePlayer = void 0),
			(this.vDi = void 0),
			(this.IHs = void 0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnMarkItemViewDestroy,
				this,
			),
			(this.Holder = void 0);
	}
	SetScale(e) {
		var t = 1 / this.Holder.LogicWorldScale,
			n =
				1 === this.Holder.MapType
					? this.IHs.GetScale3D()
					: Vector_1.Vector.OneVectorProxy;
		this.pDi.Set((e * t) / n.X, (e * t) / n.Y, (e * t) / n.Z),
			this.RootItem.SetUIRelativeScale3D(this.pDi);
	}
	OnUpdate(e, t = !1, n = !1) {
		if (void 0 === this.Holder)
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Map",
					35,
					"Holder is undefined",
					["ComponentState", this.IsDestroyOrDestroying],
					["isCreating", this.IsCreating],
				);
		else if (((this.yDi = n), this.IsCreating || this.IsDestroyOrDestroying))
			this.EDi = () => {
				this.OnUpdate(e, t, n);
			};
		else {
			this.bDi(this.yDi);
			var i = this.Holder.IsCanShowView;
			if ((this.SetUiActive(i), i)) {
				2 === this.Holder.MapType &&
					((i = CommonParamById_1.configCommonParamById.GetFloatConfig(
						"MapMarkSelectedAdditionScale",
					)),
					(i = this.IsSelected ? i : 0),
					this.SetScale(this.Holder.MarkScale + i)),
					(i = this.Holder.IsOutOfBound),
					(this.PDi === i && void 0 !== this.PDi) ||
						((this.PDi = i),
						this.PDi
							? this.GetOutOfBoundComponentAsync().then((e) => {
									e.SetActive(!0);
								})
							: this.OutOfBoundComponentInternal?.SetActive(!1)),
					(i = this.Holder.IsTracked && !t),
					(this.xDi === i && void 0 !== this.xDi) ||
						((this.xDi = i),
						this.xDi
							? this.GetTrackComponentAsync().then((e) => {
									e.SetActive(!0);
								})
							: this.TrackComponentInternal?.SetActive(!1)),
					(i = this.IsSelected),
					(this.wDi === i && void 0 !== this.wDi) ||
						(this.IsSelected
							? this.GetSelectComponentAsync().then((e) => {
									e.SetActive(!0);
								})
							: this.SelectComponentInternal?.SetActive(!1),
						(this.wDi = i));
				const o = this.qDi(this.Holder.WorldPosition, e);
				this.BDi !== o &&
					((this.BDi = o),
					this.GetVerticalPointerComponentAsync().then((e) => {
						switch (o) {
							case 0:
								e.HideSelf();
								break;
							case 1:
								e.ShowUp();
								break;
							case 2:
								e.ShowDown();
						}
					})),
					this.OnSafeUpdate(e, t, n);
			}
		}
	}
	OnSafeUpdate(e, t = 0, n) {}
	bDi(e) {
		if (void 0 === this.Holder)
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Map",
					35,
					"Holder is undefined",
					["ComponentState", this.IsDestroyOrDestroying],
					["isCreating", this.IsCreating],
				);
		else {
			if (e) {
				if (this.Holder.NeedPlayShowOrHideSeq) {
					switch (this.Holder.NeedPlayShowOrHideSeq) {
						case "ShowView":
							this.PlayInShowScaleRangeSequence();
							break;
						case "HideView":
							this.PlayOutShowScaleRangeSequence();
					}
					this.Holder.NeedPlayShowOrHideSeq = void 0;
				}
			} else
				(this.Holder.NeedPlayShowOrHideSeq = void 0),
					this.Holder.OnLevelSequenceStop("HideView");
			this.yDi = !1;
		}
	}
	SetOutOfBoundDirection(e) {
		this.GetOutOfBoundComponentAsync().then((t) => {
			var n = this.Holder.UiPosition;
			(n = Vector2D_1.Vector2D.Create(n.X, n.Y)).SubtractionEqual(e),
				t.SetOutOfBoundDirection(n);
		});
	}
	OnStartTrack() {}
	OnEndTrack() {}
	OnIconPathChanged(e) {
		var t = this.GetSprite(1);
		this.LoadIcon(t, e);
	}
	LoadIcon(e, t) {
		e &&
			!StringUtils_1.StringUtils.IsEmpty(t) &&
			this.SetSpriteByPath(t, e, !1, void 0, () => {
				e.SetUIActive(this.IsShowIcon);
			});
	}
	async LoadIconAsync(e, t) {
		await this.vDi;
		const n = new CustomPromise_1.CustomPromise();
		(this.MDi = n.Promise),
			e && !StringUtils_1.StringUtils.IsEmpty(t)
				? this.SetSpriteByPath(t, e, !1, void 0, () => {
						e.SetUIActive(this.IsShowIcon), n.SetResult();
					})
				: (n.SetResult(),
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Map",
							50,
							"标记设置失败,检查传入的参数是否有空值",
						)),
			await this.MDi;
	}
	GetInteractiveFlag() {
		return this.Holder?.IsCanShowView ?? !1;
	}
	GetMarkPriorityKey(e, t = 0) {
		let n = 0;
		switch (e) {
			case 9:
				n = 1e3;
				break;
			case 11:
				n = 3e3;
				break;
			case 12:
				n = 2e3;
				break;
			default:
				n = t;
		}
		return n;
	}
	qDi(e, t) {
		return 2 === this.Holder.MapType || ((e = e.Z - t.Z), Math.abs(e) < 2e3)
			? 0
			: e < 0
				? 1
				: 2;
	}
	PlayInShowScaleRangeSequence() {
		this.LevelSequencePlayer.StopCurrentSequence(),
			this.LevelSequencePlayer.PlayLevelSequenceByName("ShowView");
	}
	PlayOutShowScaleRangeSequence() {
		this.LevelSequencePlayer.StopCurrentSequence(),
			this.LevelSequencePlayer.PlayLevelSequenceByName("HideView");
	}
	async PlayUnlockSequence() {}
}
exports.MarkItemView = MarkItemView;
